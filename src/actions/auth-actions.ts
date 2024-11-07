"use server"

import { connectDB } from "@/db/connectDB";
import { schemaRegister } from "@/utils/auth-z-schema"
import { HashPassword } from "@/utils/bcrypt";

import User from "@/models/user.model";
import { signIn } from "next-auth/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const register = async (formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  // zod validation
  const validatedFields = schemaRegister.safeParse(data);
  if (!validatedFields.success) {
    return {
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Register.",
    };
  }

  try {
    await connectDB();
    const userFound = await User.findOne({ email: data.email });
    if(userFound){
        return {
            error: 'Email already exists!'
        }
    }
    const hashedPassword = await HashPassword(data.password as string);
    const newUser = new User({
      email: data.email,
      password: hashedPassword,
    });
    await newUser.save();
  }catch(e){
    console.log(e);
  }
}

export const login = async (formData: FormData) => {
   const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // zod validation
  const validatedFields = schemaRegister.safeParse(data);
  if (!validatedFields.success) {
    return {
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Register.",
    };
  }
  try {
   await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirect: false,
   });
  }catch(e){
    console.log(e);
  }
}

