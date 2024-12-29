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
  date: string | undefined;
  passport: string | undefined;
  buyer: string | undefined;
  seller: string | undefined;
  images: ImagesDocument[] | undefined;
  createdAt: Date;
  updatedAt: Date;
} | null;

export type Plant = {
  _id: mongoose.Types.ObjectId;
  _userId: mongoose.Types.ObjectId;
  species: string;
  variety: string;
  price: string | undefined;
  date: string | undefined;
  passport: string | undefined;
  buyer: string | undefined;
  seller: string | undefined;
  images: ImagesDocument[] | undefined;
  createdAt: Date;
  updatedAt: Date;
} | null;

export type Collections = "collected" | "purchased" | "sold";

export type PlantExtraArgs = {
  collection: Collections,
  _id?: string
}

export type PlantTableType = {
  _id: string,
  species: string,
  variety: string,
  price: string,
  date: string,
  passport: string,
  name: string,
  address: string,
  country: string,
  phone: string,
  email: string,
}
