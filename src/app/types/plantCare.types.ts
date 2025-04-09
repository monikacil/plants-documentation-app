import mongoose from "mongoose";

export type PlantCareDocument = {
  _id: mongoose.Schema.Types.ObjectId | string;
  _userId: string;
  date: Date;
  control: string;
  pests: string;
  antiPestActions: string;
  pestControlMeasures: string;
  plantsCount: number;
  species: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PlantCareFormType = Omit<
  PlantCareDocument,
  "_userId" | "createdAt" | "updatedAt"
>;
