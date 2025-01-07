"use server";

import { revalidatePath } from "next/cache";

import { connectDB } from "../lib/connectDB";
import { zodExpenseValidation } from "../lib/zod/zodValidations";

import { getSessionUserId } from "../helpers/session.helper";
import { getErrorMessage } from "../helpers/getErrorMessage.helper";

import mongoose from "mongoose";
import { SortType } from "../types/others.types";
import Expense from "../models/expense.model";

export const getExpenses = async (query: string, currentPage: number, limit: number, sort?: SortType[]) => {
  const userId = await getSessionUserId();

  const sortQuery = { "$sort": { } }

  if (sort) {
    sort.forEach((query) => {
      sortQuery["$sort"] = Object.assign(sortQuery["$sort"], {[query.key]: query.direction === "asc" ? 1 : -1})
    })
  } else {
    sortQuery["$sort"] = { createdAt: 1 }
  }

  try {
    await connectDB();
    const dbExpensesList =  await Expense.aggregate([{
      $match: {
        _userId: new mongoose.Types.ObjectId(userId),
        $or: [
          { "products": { $regex: ".*" + query + ".*", $options: "i" } },
          { "price": { $regex: ".*" + query + ".*", $options: "i" } },
          { "shop": { $regex: ".*" + query + ".*", $options: "i" } },
        ]
      }
    },
    { $skip: (currentPage - 1) * limit },
    { $limit: limit },
    sortQuery
    ])
    if (!dbExpensesList) return []

    return JSON.parse(JSON.stringify(dbExpensesList))
  } catch (error) {
      return {
        message: getErrorMessage(error, "Error occurred while fetching plants data.")
      }
  }
}

export const addExpenses = async (prevState: unknown, formData: FormData ) => {
  const validation = await zodExpenseValidation(formData);
    if (!validation.success) {
      return {
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const userId = await getSessionUserId();
    const data = {
      _userId: userId,
      products: formData.get("products"),
      price: formData.get("price"),
      shop: formData.get("shop"),
      date: formData.get("date"),
    }

    const createdExpense = await new Expense(data)
    try {
      await connectDB();
      const savedExtension = await createdExpense.save()
      revalidatePath("/extensions");
      return JSON.parse(JSON.stringify(savedExtension))
    } catch (error) {
      return {
        message: getErrorMessage(error, "Error occurred while saving extension.")
      }
    }
}