"use server";

import { unstable_rethrow } from "next/navigation";
import crypto from "crypto";

import { signIn, signOut } from "@/auth";

import connectDb from "@/app/mongoose/db.ts";
import { getErrorMessage } from "@/app/lib/utils/getErrorMessage.ts";
import { HashPassword } from "@/app/lib/bcrypt.ts";
import { sendVerificationEmail } from "@/app/lib/mailer.ts";

import User from "@/app/mongoose/models/user.model.ts";

import Account from "@/app/mongoose/models/account.model.ts";
import VerificationToken from "@/app/mongoose/models/verificationToken.model.ts";

export async function authOrSignIn(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const mode = formData.get("mode") as string;

  if (!email || !password) return { error: "Email or password is missing." };

  // zod validation

  if (mode === "register") {
    return await createUser(email, name, password);
  }
  if (mode === "login") {
    return await login(email, password);
  }
}

export async function createUser(email: string, name: string, password: string) {
  await connectDb();
  const user = await User.findOne({ email });

  if (user) return { error: "User already exists." };
  const hashedPassword = await HashPassword(password);

  try {
    const user = await User.create({
      email,
      name,
      password:
      hashedPassword,
      emailVerified: null
    });
    await Account.create({
      _userId: user._id,
      type: "credentials",
      provider: "credentials",
      providerAccountId: email,
    });

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 12); // 12h

    await VerificationToken.create({
      _userId: user._id,
      token,
      expires,
    });

    await sendVerificationEmail(email, token);
    return { success: true };
  } catch (e: unknown) {
    unstable_rethrow(e);
    return { error: getErrorMessage(e) };
  }
}

export async function login(email: string, password: string,) {
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirectTo: "/dashboard"
    });
    return { success: true };
  } catch (e: unknown) {
    unstable_rethrow(e);
    return { error: getErrorMessage(e) };
  }
}

export async function logout() {
  try {
    await signOut({ redirectTo: "/" });
  } catch (e: unknown) {
    unstable_rethrow(e);
    return { error: getErrorMessage(e) };
  }
}
