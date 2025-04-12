import mongoose, { Schema, model } from "mongoose";
import { PlantProtectionDocument } from "../types/plantProtection.types";

const PlantProtectionSchema = new Schema<PlantProtectionDocument>(
  {
    _userId: { type: String, required: true },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    control: {
      type: String,
      required: [true, "Form of control is required"],
      lowercase: true,
      trim: true,
    },
    pests: {
      type: String,
      lowercase: true,
      trim: true,
    },
    actionTaken: {
      type: String,
      required: [true, "Actions taken are required"],
      lowercase: true,
      trim: true,
    },
    exterminator: {
      type: String,
      required: [true, "Pest exterminator are required"],
      lowercase: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Plant amount is required"],
    },
    species: {
      type: String,
      required: [true, "Species are required"],
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const PlantProtection =
  mongoose.models?.PlantCare ||
  model<PlantProtectionDocument>("PlantCare", PlantProtectionSchema);
export default PlantProtection;
