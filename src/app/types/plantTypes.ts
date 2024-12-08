import mongoose from "mongoose";

export type SourceDocument = {
  name: string;
  address: string;
  phone: number;
  email: string;
  country: string;
} | null;

export type ImagesDocument = {
  originalname: string;
  filename: string,
  createdAt: Date;
  updatedAt: Date;
} | null;

export type PlantDocument = {
  _userId: mongoose.Types.ObjectId;
  species: string;
  variety: string;
  price: string | undefined;
  date: Date | undefined;
  passport: string | undefined;
  buyer: SourceDocument | undefined;
  seller: SourceDocument | undefined;
  images: ImagesDocument;
  createdAt: Date;
  updatedAt: Date;
} | null;

export type Collections = "collected" | "purchased" | "sold";
