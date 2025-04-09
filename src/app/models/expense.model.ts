import mongoose, { Schema, model } from "mongoose";
import { ExpenseDocument } from "../types/expenses.types";

const ExpenseSchema = new Schema<ExpenseDocument>(
  {
    _userId: { type: String, required: true },
    products: {
      type: String,
      required: [true, "Product is required"],
      lowercase: true,
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Price is required"],
      lowercase: true,
      trim: true,
    },
    shop: {
      type: String,
      required: [true, "Shop is required"],
      lowercase: true,
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Expense =
  mongoose.models?.Expense || model<ExpenseDocument>("Expense", ExpenseSchema);
export default Expense;
