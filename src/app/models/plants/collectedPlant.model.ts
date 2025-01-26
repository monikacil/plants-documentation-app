import mongoose, { model, Schema } from "mongoose";
import { ImagesDocument, PlantDocument } from "../../types/plant.types";

const ImageSchema = new Schema<ImagesDocument>({
  originalname: String,
  filename: String,
});

const CollectedPlantSchema = new Schema<PlantDocument>(
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
    images: {
      type: [ImageSchema],
      default: [],
    },
    createdAt: Number,
    updatedAt: Number,
  },
  { timestamps: true }
);

const CollectedPlant =
  mongoose.models?.CollectedPlant ||
  model<PlantDocument>("CollectedPlant", CollectedPlantSchema);
export default CollectedPlant;
