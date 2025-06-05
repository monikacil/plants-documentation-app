"use server";

import { unstable_rethrow } from "next/navigation";
import crypto from "crypto";

import { signOut } from "@/auth";

// mongoose
import connectDb from "@/app/mongoose/db.ts";
import User from "@/app/mongoose/models/user.model.ts";
import Account from "@/app/mongoose/models/account.model.ts";
import VerificationToken from "@/app/mongoose/models/verificationToken.model.ts";
import PasswordResetToken from "@/app/mongoose/models/passwordResetToken.model.ts";

// libs
import { HashPassword } from "@/app/lib/bcrypt.ts";
import { sendResetPasswordEmail, sendVerificationEmail } from "@/app/lib/mailer.ts";
import { createFormResponse } from "@/app/lib/createFormResponse.ts";
import { getErrorMessage } from "@/app/lib/utils/getErrorMessage.ts";
import { initResetPasswordSchema, registerSchema } from "@/app/lib/zod/zodAuth.ts";

export async function createUser(prevState: unknown, formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const name = formData.get("name")?.toString() || "";

  // zod validation
  const result = registerSchema.safeParse({ email, name, password });
  if (!result.success) {
    return createFormResponse({
      error: result.error.flatten().fieldErrors,
      status: "invalid",
    });
  }

  // db connection & user
  await connectDb();
  const user = await User.findOne({ email });
  if (user) {
    return createFormResponse({
      errorMessage: "User already exists. Please try logging in or resetting your password.",
      status: "unauthorized",
    });
  }

  // password check
  const hashedPassword = await HashPassword(password);
  try {
    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
      emailVerified: null,
    });

    // account create
    await Account.create({
      _userId: newUser._id,
      type: "credentials",
      provider: "credentials",
      providerAccountId: email,
    });

    // verification token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 12); // 12h
    await VerificationToken.create({
      _userId: newUser._id,
      token,
      expires,
    });
    await sendVerificationEmail(email, token);

    // status
    return createFormResponse({ success: true, status: "registered" });
  } catch (e) {
    unstable_rethrow(e);
    return createFormResponse({
      errorMessage: getErrorMessage(e),
      status: "server_error",
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

export async function initiatePasswordReset(prevState: unknown, formData: FormData) {
  const email = formData.get("email")?.toString() || "";

  // zod validation
  const result = initResetPasswordSchema.safeParse({ email });
  if (!result.success) {
    return createFormResponse({
      error: result.error.flatten().fieldErrors,
      status: "invalid",
    });
  }

  // db connection & user
  await connectDb();
  const user = await User.findOne({ email });
  if (!user) {
    return createFormResponse({
      errorMessage: "User not found",
      status: "invalid",
    });
  }

  // reset password token
  await PasswordResetToken.deleteMany({ _userId: user._id });
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 30);

  try {
    await PasswordResetToken.create({
      _userId: user._id,
      token,
      expires,
    });

    await sendResetPasswordEmail(email, token);
    return createFormResponse({
      status: "success",
    });
  } catch (e) {
    unstable_rethrow(e);
    return createFormResponse({
      errorMessage: getErrorMessage(e),
      status: "server_error",
    });
  }
}

export async function resetPassword(token: string, newPassword: string) {
  await connectDb();
  const resetToken = await PasswordResetToken.findOne({ token });
  if (!resetToken || resetToken.expires < new Date()) {
    throw new Error("Token expired or invalid");
  }

  const user = await User.findById(resetToken._userId);
  if (!user) throw new Error("User not found");

  user.password = await HashPassword(newPassword);
  await user.save();

  await PasswordResetToken.deleteOne({ token });
}
