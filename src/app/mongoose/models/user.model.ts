import mongoose, { model, Schema } from "mongoose";
import { withSanitizedOutput } from "@/app/mongoose/sanitize";
import type { UserDocument } from "@/app/mongoose/types/user.types";

const UserSchema = withSanitizedOutput(
  new Schema<UserDocument>(
    {
      name: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,
      },
      emailVerified: {
        type: Date,
        default: null,
      },
      password: {
        type: String,
        required: false,
        minlength: [6, "Password must be at least 6 characters long"],
        select: false,
      },
      image: {
        type: String,
        default: null,
      },
    },
    { timestamps: true }
  )
);

export const User =
  mongoose.models?.User || model<UserDocument>("User", UserSchema);
