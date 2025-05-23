"use server";

import { unstable_rethrow } from "next/navigation";
import crypto from "crypto";

import { signIn, signOut } from "@/auth";

import connectDb from "@/app/mongoose/db.ts";
import { HashPassword } from "@/app/lib/bcrypt.ts";
import { sendVerificationEmail } from "@/app/lib/mailer.ts";

import User from "@/app/mongoose/models/user.model.ts";

import Account from "@/app/mongoose/models/account.model.ts";
import VerificationToken from "@/app/mongoose/models/verificationToken.model.ts";
import { loginSchema, registerSchema } from "@/app/lib/zod/zodAuth.ts";
import { getErrorMessage } from "@/app/lib/utils/getErrorMessage.ts";
import { createFormResponse } from "@/app/lib/createFormResponse.ts";


export async function authOrSignIn(prevState: unknown, formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const name = formData.get("name")?.toString() || "";
  const mode = formData.get("mode") as "login" | "register";

  // if (!email || !password) {
  //   return createFormResponse({
  //     errorMessage: "Email or Password is missing. Please try again.",
  //     status: "invalid",
  //   });
  // }

  if (mode === "register") {
    return await createUser(email, name, password);
  }

  if (mode === "login") {
    return await login(email, password);
  }

  return createFormResponse({
    errorMessage: "Something went wrong. Please try again.",
    status: "invalid",
  });
}

export async function createUser(email: string, name: string, password: string) {
  await connectDb();

  const user = await User.findOne({ email });
  if (user) {
    return createFormResponse({
      errorMessage: "User already exists. Please try logging in or resetting your password.",
      status: "unauthorized",
    });
  }

  const result = registerSchema.safeParse({ email, name, password });
  if (!result.success) {
    return createFormResponse({
      error: result.error.flatten().fieldErrors,
      status: "invalid",
    });
  }

  const hashedPassword = await HashPassword(password);

  try {
    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
      emailVerified: null,
    });

    await Account.create({
      _userId: newUser._id,
      type: "credentials",
      provider: "credentials",
      providerAccountId: email,
    });

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 12); // 12h

    await VerificationToken.create({
      _userId: newUser._id,
      token,
      expires,
    });

    await sendVerificationEmail(email, token);

    return createFormResponse({ success: true, status: "registered" });
  } catch (e) {
    unstable_rethrow(e);
    return createFormResponse({
      errorMessage: getErrorMessage(e),
      status: "server_error",
    });
  }
}

export async function login(email: string, password: string) {
  const result = loginSchema.safeParse({ email, password });
  if (!result.success) {
    return createFormResponse({
      error: result.error.flatten().fieldErrors,
      status: "invalid",
    });
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });

    return createFormResponse({ success: true, status: "logged_in" });
  } catch (e) {
    unstable_rethrow(e);
    return createFormResponse({
      errorMessage: getErrorMessage(e),
      status: "unauthorized",
    });
  }
}

export async function logout() {
  try {
    await signOut({ redirectTo: "/" });
  } catch (e: unknown) {
    unstable_rethrow(e);
    return createFormResponse({
      errorMessage: getErrorMessage(e),
    });
  }
}
