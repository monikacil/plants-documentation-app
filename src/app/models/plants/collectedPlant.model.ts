import mongoose, { model, Schema } from "mongoose";
import { ImagesDocument, PlantDocument } from "../../types/plantTypes";

const ImageSchema = new Schema<ImagesDocument>(
  {
    originalname: String,
    filename: String,
  },
  { timestamps: true }
);

const CollectedPlantSchema = new Schema<PlantDocument>({
  _userId: { type: mongoose.Types.ObjectId, ref: "User" },
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
});

CollectedPlantSchema.index({ species: 'text', variety: 'text' });

const CollectedPlant = mongoose.models?.CollectedPlant || model<PlantDocument>('CollectedPlant', CollectedPlantSchema);
export default CollectedPlant;
