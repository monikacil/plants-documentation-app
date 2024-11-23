export type UserAuth = {
  email: string | null,
  password: string | null
}

export type UserDocument  = {
  _id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
} | null
