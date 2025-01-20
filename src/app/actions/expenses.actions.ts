"use server";

import { revalidatePath } from "next/cache";

import { connectDB } from "@/app/lib/connectDB";
import { zodExpenseValidation } from "@/app/lib/zod/zodValidations";

import { getSessionUserId } from "@/app/lib/utils/session.helper";
import { getErrorMessage } from "@/app/lib/utils/getErrorMessage";

import mongoose from "mongoose";
import { SortType } from "@/app/types/others.types";
import Expense from "@/app/models/expense.model";

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

export const addExpenses = async (prevState: unknown, formData: FormData) => {
  // zod validation
  const validation = await zodExpenseValidation(formData);
    if (!validation.success) {
      return {
        errors: validation.error.flatten().fieldErrors,
    };
  }

  const userId = await getSessionUserId();
  const data = { _userId: userId, ...validation.data }
  const createdExpense = await new Expense(data)

  try {
    await connectDB();
    const savedExpense = await createdExpense.save()
    revalidatePath("/expenses");
    return JSON.parse(JSON.stringify(savedExpense))
  } catch (error) {
    return {
      message: getErrorMessage(error, "Error occurred while saving expense.")
    }
  }
}

export const deleteExpense = async (id: string) => {
  const userId = await getSessionUserId();

  try {
    await connectDB();
    await Expense.deleteOne({ _id: id, _userId: userId })
    revalidatePath("/expenses");
  } catch (error) {
      return {
      message: getErrorMessage(error, "Error occurred while deleting expense.")
    }
  }
}

export const editPlant = async (id: string, prevState: object, formData: FormData) => {
  // zod validation
  const validation = await zodExpenseValidation(formData);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const userId = await getSessionUserId();
  const data = { _userId: userId, ...validation.data }

  try {
    await connectDB();
    await Expense.findByIdAndUpdate({ _id: id, _userId: userId }, data)
    revalidatePath("/expenses");
  } catch (error) {
    return {
      message: getErrorMessage(error, "Error occurred while editing expense.")
    }
  }
}

export const getExpense = async (id: string) => {
  const userId = await getSessionUserId();

  try {
    await connectDB();
    const expense = await Expense.findOne({_id: id, _userId: userId})
    revalidatePath("/expenses");
    return JSON.parse(JSON.stringify(expense))
  } catch (error) {
    return {
      message: getErrorMessage(error, "Error occurred while getting expense.")
    }
  }
}

export const fetchExpensesPages = async (query: string, limit: number) => {
  const userId = await getSessionUserId();

  try {
    await connectDB();
    const expenses =  await Expense.aggregate([{
      $match: {
        _userId: new mongoose.Types.ObjectId(userId),
        $or: [
          { "products": { $regex: ".*" + query + ".*", $options: "i" } },
          { "shop": { $regex: ".*" + query + ".*", $options: "i" } },
        ]
      }
    }])
    return Math.ceil(expenses.length / limit)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
      return 1
  }
}
