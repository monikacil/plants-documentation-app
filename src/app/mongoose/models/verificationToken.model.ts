import { model, models, Schema } from "mongoose";

export type VerificationTokenDocument = {
  userId: string;
  token: string;
  expires: Date;
  createdAt?: Date;
};

const VerificationTokenSchema = new Schema<VerificationTokenDocument>(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
      index: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expires: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
  },
  { timestamps: true }
);

export const VerificationToken =
  models?.VerificationToken ||
  model<VerificationTokenDocument>("VerificationToken", VerificationTokenSchema);
