import mongoose, { model, Schema } from "mongoose";
import { PlantDocument } from "../types/plant.types.ts";
import {ObjectId} from "mongodb";

const CollectedPlantSchema = new Schema<PlantDocument>(
  {
    _userId: { type: ObjectId, required: true },
    species: {
      type: String,
      required: [true, "Species is required"],
      trim: true,
      lowercase: true,
    },
    variety: {
      type: String,
      required: [true, "Variety is required"],
      minLength: [3, "Minimum length is 3 characters"],
      trim: true,
      lowercase: true,
    },
    _sellerId: ObjectId,
    _buyerId: ObjectId,
    createdAt: Number,
    updatedAt: Number,
  },
  { timestamps: true }
);

const CollectedPlant =
  mongoose.models?.CollectedPlant ||
  model<PlantDocument>("CollectedPlant", CollectedPlantSchema);
export default CollectedPlant;
