import { Schema } from "mongoose";

export type PlantDocument = {
  _userId: Schema.Types.ObjectId;
  species: string;
  variety: string;
  price: string | null;
  date: Date;
  passport: string | null;
  // _buyerId: Schema.Types.ObjectId | null;
  // _sellerId: Schema.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
};
