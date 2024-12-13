import mongoose, { model, Schema } from "mongoose";
import { SourceDocument, ImagesDocument, PlantDocument } from "../../types/plantTypes";

const BuyerSubSchema = new Schema<SourceDocument>({
  name: {
    type: String,
    required: [true, "Buyer name is required"],
  },
  address: {
    type: String,
  },
  phone: {
    type: Number,
    trim: true,
    required: [true, "Buyer phone number is required"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Buyer email is required"],
  },
  country: {
    type: String,
  },
});

const ImageSchema = new Schema<ImagesDocument>(
  {
    originalname: String,
    filename: String,
  },
  { timestamps: true }
);

const SoldPlantSchema = new Schema<PlantDocument>({
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
  buyer: BuyerSubSchema,
  images: {
    type: [ImageSchema],
    default: [],
  },
});

SoldPlantSchema.index({ species: 'text', variety: 'text' });

const SoldPlant = mongoose.models?.SoldPlant || model<PlantDocument>('SoldPlant', SoldPlantSchema);
export default SoldPlant;
