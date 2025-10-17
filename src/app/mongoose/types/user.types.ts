import type { Types } from "mongoose";

export type UserDocument = {
  _id?: Types.ObjectId;
  name?: string;
  email: string;
  emailVerified?: Date | null;
  password?: string;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};
