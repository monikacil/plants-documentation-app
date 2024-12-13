import mongoose from "mongoose";

export type SourceDocument = {
  name: string;
  address: string;
  country: string;
  phone: string;
  email: string;
} | null;

export type ImagesDocument = {
  originalname: string;
  filename: string,
  createdAt: Date;
  updatedAt: Date;
} | null;

export type PlantDocument = {
  _id: mongoose.Types.ObjectId;
  _userId: mongoose.Types.ObjectId;
  species: string;
  variety: string;
  price: string | undefined;
  date: Date | null | undefined;
  passport: string | undefined;
  buyer: SourceDocument | undefined;
  seller: SourceDocument | undefined;
  images: ImagesDocument;
  createdAt: Date;
  updatedAt: Date;
} | null;

export type Collections = "collected" | "purchased" | "sold";

export type Plant = {
  _id?: string,
  species: string | undefined,
  variety: string | undefined,
  images?: string[],
  price: string | undefined,
  date: Date | null | undefined,
  passport: string | undefined,
  name: string | undefined,
  address: string | undefined,
  country: string | undefined,
  phone: string | undefined,
  email: string | undefined,
}
