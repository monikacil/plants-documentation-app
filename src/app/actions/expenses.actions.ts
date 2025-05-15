"use server";

import { revalidatePath } from "next/cache";

import { dbConnect } from "@/app/lib/db.ts";
import { zodExpenseValidation } from "@/app/lib/zod/zodValidations";

import { getSessionUserId } from "@/app/lib/utils/session.helper";
import { getErrorMessage } from "@/app/lib/utils/getErrorMessage";

import { SortType } from "@/app/types/others.types";
import Expense from "@/app/models/expense.model";
import { ExpenseDocument } from "../types/expenses.types";

export const getExpenses = async (
  query: string,
  currentPage: number,
  limit: number,
  sort?: SortType[]
) => {
  const userId = await getSessionUserId();
  const sortQuery = { $sort: {} };

  if (sort) {
    sort.forEach((query) => {
      sortQuery["$sort"] = Object.assign(sortQuery["$sort"], {
        [query.key]: query.direction === "asc" ? 1 : -1,
      });
    });
  } else {
    sortQuery["$sort"] = { createdAt: 1 };
  }

  try {
    await dbConnect();
    const dbExpensesList = await Expense.aggregate([
      {
        $match: {
          _userId: userId,
          $or: [
            { products: { $regex: ".*" + query + ".*", $options: "i" } },
            { price: { $regex: ".*" + query + ".*", $options: "i" } },
            { shop: { $regex: ".*" + query + ".*", $options: "i" } },
          ],
        },
      },
      { $skip: (currentPage - 1) * limit },
      { $limit: limit },
      sortQuery,
    ]);

    if (!dbExpensesList.length) return [];
    return JSON.parse(JSON.stringify(dbExpensesList));
  } catch (error) {
    return {
      message: getErrorMessage(
        error,
        "Error occurred while fetching expenses data."
      ),
    };
  }
};

export const addExpenses = async (
  id: string | undefined,
  prevState: unknown,
  formData: FormData
) => {
  if (id) return;
  // zod validation
  const validation = await zodExpenseValidation(formData);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const userId = await getSessionUserId();
  const data = { _userId: userId, ...validation.data };
  const createdExpense = await new Expense(data);

  try {
    await dbConnect();
    await createdExpense.save();
    revalidatePath("/expenses");
  } catch (error) {
    return {
      message: getErrorMessage(error, "Error occurred while saving expense."),
    };
  }
};

export const deleteExpense = async (id: string) => {
  const userId = await getSessionUserId();

  try {
    await dbConnect();
    await Expense.deleteOne({ _id: id, _userId: userId });
    revalidatePath("/expenses");
  } catch (error) {
    return {
      message: getErrorMessage(error, "Error occurred while deleting expense."),
    };
  }
};

export const editExpense = async (
  id: string | undefined,
  prevState: object,
  formData: FormData
) => {
  if (!id) return;
  // zod validation
  const validation = await zodExpenseValidation(formData);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const userId = await getSessionUserId();
  const data = { _userId: userId, ...validation.data };

  try {
    await dbConnect();
    await Expense.findByIdAndUpdate({ _id: id, _userId: userId }, data);
    revalidatePath("/expenses");
  } catch (error) {
    return {
      message: getErrorMessage(error, "Error occurred while editing expense."),
    };
  }
};

const uiExpenseObject = (expense: ExpenseDocument) => {
  if (!expense) return;

  return {
    _id: expense._id,
    products: expense.products,
    shop: expense.shop,
    price: expense.price,
    date: expense.date,
  };
};

export const getExpense = async (id: string) => {
  const userId = await getSessionUserId();

  try {
    await dbConnect();
    const expense = await Expense.findOne({ _id: id, _userId: userId });
    return JSON.parse(JSON.stringify(uiExpenseObject(expense)));
  } catch (error) {
    return {
      message: getErrorMessage(error, "Error occurred while getting expense."),
    };
  }
};

export const getExpensesPages = async (query: string, limit: number) => {
  const userId = await getSessionUserId();

  try {
    await dbConnect();
    const expenses = await Expense.aggregate([
      {
        $match: {
          _userId: userId,
          $or: [
            { products: { $regex: ".*" + query + ".*", $options: "i" } },
            { shop: { $regex: ".*" + query + ".*", $options: "i" } },
          ],
        },
      },
    ]);
    return Math.ceil(expenses.length / limit);
    // eslint-disable-next-line @/app/typescript-eslint/no-unused-vars
  } catch (error) {
    return -1;
  }
};
