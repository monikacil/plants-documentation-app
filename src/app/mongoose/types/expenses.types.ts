import { Schema } from "mongoose";

export type ExpenseDocument = {
  _userId: Schema.Types.ObjectId;
  products: string;
  price: string;
  shop: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};
