import User from "../models/user.model";
import { UserAuth } from "../types/userTypes";
import { connectDB } from "../lib/connectDB";
import { AuthErrorsType } from "../types/errorsType";
import { ComparePassword } from "../lib/bcrypt";

const errors: AuthErrorsType = {
  email: [],
  password: [],
  form: []
}

export const getUserByEmail = async (credentials: UserAuth) => {
  await connectDB();
  // check if user egsist
  const userFound = await User.findOne({ email: credentials?.email });
  const isValid = await ComparePassword(userFound.password, credentials?.password)

  if (!userFound || !isValid) {
    errors.form = ["Incorrect email or password"]
    return {
      errors: errors
    }
  };

  return userFound
}