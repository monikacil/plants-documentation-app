import mongoose, { model, Schema } from "mongoose";

import { withSanitizedOutput } from "@/app/mongoose/sanitize.ts";
import { UserDocument } from "@/app/mongoose/types/user.types.ts";

const UserSchema = withSanitizedOutput(
  new Schema<UserDocument>(
    {
      name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        lowercase: true,
      },
      email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,
      },
      emailVerified: Date,
      password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Minimum length is 6 characters"],
        trim: true,
        select: false,
      },
    },
    { timestamps: true }
  )
);

const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);
export default User;
