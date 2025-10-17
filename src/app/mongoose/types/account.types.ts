import type { Types } from "mongoose";

export type AccountDocument = {
  _id?: Types.ObjectId;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;

  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;

  oauth_token_secret?: string;
  oauth_token?: string;

  createdAt?: Date;
  updatedAt?: Date;
};
