import mongoose from "mongoose";

export type ProtectionDocument = {
  _id: mongoose.Schema.Types.ObjectId | string;
  _userId: string;
  date: Date;
  control: string;
  pests: string;
  actionTaken: string;
  exterminator: string;
  amount: number;
  species: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ProtectionFormType = Omit<
  ProtectionDocument,
  "_userId" | "createdAt" | "updatedAt"
>;
