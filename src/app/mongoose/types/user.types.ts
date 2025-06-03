export type UserDocument = {
  name?: string;
  email: string;
  emailVerified?: Date | null;
  password?: string;
};
