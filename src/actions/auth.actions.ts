"use server";

import { unstable_rethrow } from "next/navigation";
import crypto from "crypto";
import { signOut } from "@/auth.ts";

// mongoose
import { connectDb } from "@/app/mongoose/db.ts";
import { User } from "@/app/mongoose/models/user.model.ts";
import { Account } from "@/app/mongoose/models/account.model.ts";
import { VerificationToken } from "@/app/mongoose/models/verificationToken.model.ts";
import { PasswordResetToken } from "@/app/mongoose/models/passwordResetToken.model.ts";

// libs
import { HashPassword } from "@/app/lib/bcrypt.ts";
import { sendResetPasswordEmail, sendVerificationEmail, } from "@/app/lib/mailer.ts";
import { createFormResponse } from "@/app/lib/createFormResponse.ts";
import { getErrorMessage } from "@/app/lib/utils/getErrorMessage.ts";
import { initResetPasswordSchema, registerSchema, } from "@/app/lib/zod/zodAuth.ts";

/**
 * User registration with email confirmation
 */
export async function createUser(_: unknown, formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const name = formData.get("name")?.toString() || "";

  const result = registerSchema.safeParse({ email, name, password });
  if (!result.success) {
    return createFormResponse({
      error: result.error.flatten().fieldErrors,
      status: "invalid",
    });
  }

  await connectDb();

  const existing = await User.findOne({ email });
  if (existing) {
    return createFormResponse({
      errorMessage: "A user with this address already exists.",
      status: "unauthorized",
    });
  }

  try {
    const hashed = await HashPassword(password);
    const user = await User.create({
      email,
      name,
      password: hashed,
      emailVerified: null,
    });

    await Account.create({
      userId: user._id.toString(),
      type: "credentials",
      provider: "credentials",
      providerAccountId: email,
    });

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 12); // 12h
    await VerificationToken.create({
      userId: user._id.toString(), // ✅ string
      token,
      expires,
    });

    await sendVerificationEmail(email, token);

    return createFormResponse({
      success: true,
      status: "registered",
    });
  } catch (e) {
    console.error("[CREATE_USER_ERROR]", e);
    return createFormResponse({
      errorMessage: getErrorMessage(e),
      status: "server_error",
    });
  }
}

/**
 * User logout
 */
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

/**
 * Initiates the password reset process
 */
export async function initiatePasswordReset(_: unknown, formData: FormData) {
  const email = formData.get("email")?.toString() || "";

  const result = initResetPasswordSchema.safeParse({ email });
  if (!result.success) {
    return createFormResponse({
      error: result.error.flatten().fieldErrors,
      status: "invalid",
    });
  }

  try {
    await connectDb();
    const user = await User.findOne({ email });
    if (!user) {
      return createFormResponse({
        errorMessage: "No user with this email address found.",
        status: "invalid",
      });
    }

    await PasswordResetToken.deleteMany({ userId: user._id.toString() });

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 30);

    await PasswordResetToken.create({
      userId: user._id.toString(),
      token,
      expires,
    });

    await sendResetPasswordEmail(email, token);

    return createFormResponse({ status: "success" });
  } catch (e) {
    console.error("[INITIATE_RESET_ERROR]", e);
    return createFormResponse({
      errorMessage: getErrorMessage(e),
      status: "server_error",
    });
  }
}

/**
 * Sets a new password after token verification
 */
export async function resetPassword(token: string, newPassword: string) {
  if (!token || !newPassword) {
    throw new Error("Token and new password are required.");
  }

  await connectDb();

  const resetToken = await PasswordResetToken.findOne({ token });
  if (!resetToken) {
    throw new Error("Invalid password reset token.");
  }

  if (resetToken.expires < new Date()) {
    await PasswordResetToken.deleteOne({ token });
    throw new Error("Reset token expired.");
  }

  const user = await User.findById(resetToken.userId);
  if (!user) {
    await PasswordResetToken.deleteOne({ token });
    throw new Error("User not found.");
  }

  user.password = await HashPassword(newPassword);

  await Promise.all([
    user.save(),
    PasswordResetToken.deleteOne({ token }),
  ]);

  return createFormResponse({ status: "password_reset" });
}
