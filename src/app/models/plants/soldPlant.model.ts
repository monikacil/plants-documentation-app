import mongoose, { model, Schema } from "mongoose";
import { ImagesDocument, PlantDocument } from "../../types/plant.types";

const ImageSchema = new Schema<ImagesDocument>({
  originalname: String,
  filename: String,
});

const SoldPlantSchema = new Schema<PlantDocument>(
  {
    _userId: { type: String, required: true },
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
    price: {
      type: String,
      trim: true,
      lowercase: true,
    },
    date: {
      type: Date,
    },
    passport: {
      type: String,
      required: [true, "Passport number is required"],
      trim: true,
    },
    buyer: {
      type: String,
      required: [true, "Buyer data is required"],
    },
    images: {
      type: [ImageSchema],
      default: [],
    },
    createdAt: Number,
    updatedAt: Number,
  },
  { timestamps: true }
);

const SoldPlant =
  mongoose.models?.SoldPlant ||
  model<PlantDocument>("SoldPlant", SoldPlantSchema);
export default SoldPlant;
