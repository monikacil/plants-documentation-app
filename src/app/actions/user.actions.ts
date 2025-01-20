'use server';

import User from "@/app/models/user.model";

import { connectDB } from "@/app/lib/connectDB";

export const getUserByEmail = async (email: string) => {
  await connectDB();
  // check if user egsist
  const userFound = await User.findOne({ email });

  if (!userFound) {
    return null
  };

  return userFound
}
