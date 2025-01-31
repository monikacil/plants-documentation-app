import mongoose, { Schema, model } from "mongoose";
import { PlantCareDocument } from "../types/plantCare.types";

const PlantCareSchema = new Schema<PlantCareDocument>(
  {
    _userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
    antiPestActions: {
      type: String,
      required: [true, "Anti-pest actions are required"],
      lowercase: true,
      trim: true,
    },
    pestControlMeasures: {
      type: String,
      required: [true, "Pest control measures are required"],
      lowercase: true,
      trim: true,
    },
    plantsCount: {
      type: Number,
      required: [true, "Plants count is required"],
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

const PlantCare =
  mongoose.models?.PlantCare ||
  model<PlantCareDocument>("PlantCare", PlantCareSchema);
export default PlantCare;
