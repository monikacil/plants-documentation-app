import { Schema } from "mongoose";

export type UserDocument = {
  _id: Schema.Types.ObjectId;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
