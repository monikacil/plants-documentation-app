import mongoose, { model, Schema } from "mongoose";
import { ImagesDocument, PlantDocument } from "../../types/plant.types";

const ImageSchema = new Schema<ImagesDocument>({
  originalname: String,
  filename: String,
});

const PurchasedPlantSchema = new Schema<PlantDocument>(
  {
    _userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
      type: String,
    },
    passport: {
      type: String,
      required: [true, "Passport number is required"],
      trim: true,
    },
    seller: String,
    images: {
      type: [ImageSchema],
      default: [],
    },
    createdAt: Number,
    updatedAt: Number,
  },
  { timestamps: true }
);

const PurchasedPlant =
  mongoose.models?.PurchasedPlant ||
  model<PlantDocument>("PurchasedPlant", PurchasedPlantSchema);
export default PurchasedPlant;
