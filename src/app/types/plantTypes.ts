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


export type Plant = {
  _id: string,
  species: string | undefined,
  variety: string | undefined,
  images?: [],
  price: string | undefined,
  date: string,
  passport: string | undefined,
  name: string | undefined,
  address: string | undefined,
  country: string | undefined,
  phone: number | undefined,
  email: string | undefined,

}

