import mongoose from "mongoose"

export type ExpenseDocument = {
  _id: mongoose.Schema.Types.ObjectId,
  _userId: mongoose.Schema.Types.ObjectId,
  products: string,
  price: string,
  shop: string,
  date: string,
  createdAt: Date;
  updatedAt: Date;
};

export type ExpenseFormType = {
  products: string,
  price: string,
  shop: string,
  date: string,
}
