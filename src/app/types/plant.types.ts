import { Schema } from "mongoose";

export type ImagesDocument = {
  originalname: string;
  filename: string;
  createdAt: Date;
  updatedAt: Date;
} | null;

export interface PlantDocument {
  _id: Schema.Types.ObjectId | string;
  _userId: string;
  species: string;
  variety: string;
  price: string | undefined;
  date: Date;
  passport: string | undefined;
  buyer: string | undefined;
  seller: string | undefined;
  images: ImagesDocument[] | undefined;
  createdAt: Date;
  updatedAt: Date;
}

export type Collections = "collected" | "purchased" | "sold";

export type PlantExtraArgs = {
  collection: Collections;
  id?: string;
};

type ClienType = {
  name: string;
  address: string;
  phone: string;
  email: string;
  country: string;
};

type PlantOmitType = Omit<
  PlantDocument,
  "_userId" | "createdAt" | "updatedAt" | "images" | "buyer" | "seller"
>;

export type PlantTableType = PlantOmitType & ClienType;
