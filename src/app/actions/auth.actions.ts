"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import User from "@/models/user.model";

import { getUserByEmail } from "./user.actions";

import { type UserDocument } from "@/types/user.types";

import { getErrorMessage } from "@/lib/utils/getErrorMessage";

import { connectDB } from "@/lib/connectDB";
import { ComparePassword, HashPassword } from "@/lib/bcrypt";
import { createSession } from "@/lib/joseSession";
import { AuthErrors } from "@/lib/zod/errors";
import { zodAuthValidation } from "@/lib/zod/zodValidations";

const COOKIE_NAME = process.env.COOKIE_NAME as string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const register = async (prevState: any, formData: FormData) => {
  // zod validation
  const validation = await zodAuthValidation(formData);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }
  const { email, password } = validation.data;
  // db connection
  await connectDB();
  // check if user already exist
  const userFound = await User.findOne({ email });
  if (userFound) {
    return { errors: AuthErrors.emailUnavailable };
  }
  // create new user & save in db
  const hashedPassword = await HashPassword(password);
  const newUser = new User({ email, password: hashedPassword });
  let savedUser;
  try {
    savedUser = await newUser.save();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    return {
      message: getErrorMessage(error, "Registration failed."),
    };
  }

  if (!savedUser) {
    return { errors: AuthErrors.accountCreatingError };
  }
  // redirect to login page
  redirect("/login");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function login(prevState: any, formData: FormData) {
  // zod validation
  const validation = await zodAuthValidation(formData);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }
  const { email, password } = validation.data;
  // db connection
  await connectDB();
  // check if user is registered
  const user: UserDocument = await getUserByEmail(email);
  if (!user) {
    return { errors: AuthErrors.validationDefaultError };
  }
  // password validation
  const isValid = await ComparePassword(user.password, password);

  if (!isValid) {
    return { errors: AuthErrors.validationDefaultError };
  }
  // Create the session
  const userId = user._id;
  await createSession(userId);
}

export async function logout() {
  // Destroy the session
  (await cookies()).delete({ name: COOKIE_NAME });
  redirect("/login");
}
