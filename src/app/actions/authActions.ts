"use server"

import { redirect } from "next/navigation";

import User from "@/app/models/user.model";
import { connectDB } from "@/app/lib/connectDB";
import { ComparePassword, HashPassword } from "@/app/lib/bcrypt";
import { zodSchema } from "../lib/zod";
import { UserDocument } from "../types/userTypes";
import { getUserByEmail } from "./userActions";
import { createSession } from "../lib/joseSession";
import { cookies } from "next/headers";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const register = async (prevState: any, formData: FormData) => {
  const data = { email: formData.get("email"), password: formData.get("password") };

   // zod validation
  const validation = zodSchema.safeParse({
    email: data.email,
    password: data.password,
  });

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
    return { message: "Email already exists, please use a different email." }
  }
  // create new user & save in db
  const hashedPassword = await HashPassword(password);
  const newUser = new User({email, password: hashedPassword});
  const savedUser = await newUser.save();

  if (!savedUser) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }
  // redirect to signin page
  redirect("/signin")
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function login(prevState: any, formData: FormData) {
  const data = { email: formData.get("email"), password: formData.get("password") };

   // zod validation
  const validation = zodSchema.safeParse({
    email: data.email,
    password: data.password,
  });

  if (!validation.success) {
    console.log(1111)
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  console.log(222)

  const { email, password } = validation.data;

  // db connection
  await connectDB();
  // check if user is registered
  const userFound: UserDocument = await getUserByEmail({ email, password });
  if (!userFound) {
    return { message: "Invalid email or password." }
  }

  // check if user set valid password
  const isValid = await ComparePassword(userFound.password, password)
  if (!isValid) {
    return { message: "Invalid email or password." }
  };
  // Create the session
  const userId = userFound._id.toString();
  await createSession(userId);
}

export async function logout() {
  // Destroy the session
  (await cookies()).delete({name: 'plant-doc-session'});
  redirect('/signin');
}
