import { model, models, Schema } from "mongoose";

export type PasswordResetTokenDocument = {
  userId: string;
  token: string;
  expires: Date;
  createdAt?: Date;
};

const PasswordResetTokenSchema = new Schema<PasswordResetTokenDocument>(
  {
    userId: {
      type: String,
      required: true
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

export const PasswordResetToken =
  models?.PasswordResetToken ||
  model<PasswordResetTokenDocument>("PasswordResetToken", PasswordResetTokenSchema);
