import mongoose from "mongoose";

export type ExpenseDocument = {
  _id: mongoose.Schema.Types.ObjectId | string;
  _userId: string;
  products: string;
  price: string;
  shop: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type ExpenseFormType = Pick<
  ExpenseDocument,
  "products" | "price" | "shop" | "date" | "_id"
>;
