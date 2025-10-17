import mongoose, { model, Schema } from "mongoose";
import { withSanitizedOutput } from "@/app/mongoose/sanitize";
import type { AccountDocument } from "@/app/mongoose/types/account.types";

const AccountSchema = withSanitizedOutput(
  new Schema<AccountDocument>(
    {
      userId: {
        type: String,
        required: true,
        index: true,
      },
      type: { type: String, required: true },
      provider: { type: String, required: true },
      providerAccountId: { type: String, required: true },

      refresh_token: { type: String },
      access_token: { type: String },
      expires_at: { type: Number },
      token_type: { type: String },
      scope: { type: String },
      id_token: { type: String },
      session_state: { type: String },

      oauth_token_secret: { type: String },
      oauth_token: { type: String },
    },
    { timestamps: true }
  ),
  ["refresh_token", "access_token"]
);

AccountSchema.index(
  { provider: 1, providerAccountId: 1 },
  { unique: true, name: "provider_providerAccountId_unique" }
);

export const Account =
  mongoose.models?.Account || model<AccountDocument>("Account", AccountSchema);
