import  mongoose, { Schema, model } from  "mongoose";
import { ShoppingDocument } from "../types/shopping.types";

const ShoppingSchema = new Schema<ShoppingDocument>(
  {
    products: {
      type: String,
      required: [true, "Product is required"],
      lowercase: true,
      trim: true
    },
    price: {
      type: String,
      required: [true, "Price is required"],
      lowercase: true,
      trim: true
    },
    shop: {
      type: String,
      required: [true, "Shop is required"],
      lowercase: true,
      trim: true
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
  },
  {
    timestamps: true
  }
);

const Shopping = mongoose.models?.Shopping || model<ShoppingDocument>('User', ShoppingSchema);
export default Shopping;
