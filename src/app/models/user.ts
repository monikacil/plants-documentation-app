import mongoose, { model, Schema } from "mongoose";
import { UserDocument } from "../types/user.types.ts";

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const User= mongoose.models?.User || model<UserDocument>("User", UserSchema);
export default User;
