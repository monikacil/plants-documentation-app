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

export type PlantExtraArgs = {
  collection: Collections,
  _id?: string
}

export type Plant = {
  _id: string,
  species: string,
  variety: string,
  images: string[],
  price: string,
  date: Date | null,
  passport: string,
  name: string,
  address: string,
  country: string,
  phone: string,
  email: string,
}
