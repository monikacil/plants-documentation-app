export type UserAuth = {
  email: string,
  password: string
}

export type UserDocument  = {
  _id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
} | null
