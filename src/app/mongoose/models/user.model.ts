import mongoose, { model, Schema } from "mongoose";

import { withSanitizedOutput } from "@/app/mongoose/sanitize.ts";
import { UserDocument } from "@/app/mongoose/types/user.types.ts";

const UserSchema = withSanitizedOutput(
  new Schema<UserDocument>(
    {
      name: {
        type: String,
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
      emailVerified: { type: Date, default: null },
      password: {
        type: String,
        required: false,
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
