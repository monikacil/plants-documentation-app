import mongoose, { model, Schema } from "mongoose";

import { ExpenseDocument } from "@/app/mongoose/types/expenses.types.ts";

const ExpenseSchema = new Schema<ExpenseDocument>(
  {
    _userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
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
      type: Date,
      required: [true, "Date is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.models?.Expense || model<ExpenseDocument>("Expense", ExpenseSchema);
export default Expense;
