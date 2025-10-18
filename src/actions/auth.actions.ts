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
import { ComparePassword, HashPassword } from "@/app/lib/bcrypt.ts";
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
  const email = formData.get("email")?.toString().trim().toLowerCase() || "";
  const result = initResetPasswordSchema.safeParse({ email });
  if (!result.success) {
    return {
      status: "invalid",
      message: "Email address is invalid.",
    }
  }
  try {
    await connectDb();

    // 🧩 Minimal latency – to make it difficult to distinguish accounts (timing attack)
    const start = Date.now();
    const user = await User.findOne({ email });
    const elapsed = Date.now() - start;
    const delay = Math.max(500 - elapsed, 0);
    if (delay > 0) await new Promise((r) => setTimeout(r, delay));

    if (!user) {
      // Safely returns the same message - it doesn't reveal whether the email exists
      return {
        status: "success",
        message: "Reset password email sent."
      };
    }
    // 🧹 Delete old tokens if any exist
    await PasswordResetToken.deleteMany({ userId: user._id.toString() });

    // 🔐 Generate a new, unique token (256-bit)
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 min

    await PasswordResetToken.create({
      userId: user._id.toString(),
      token,
      expires,
    });

    // ✉️ Send an email with a reset link
    await sendResetPasswordEmail(email, token);
    return {
      status: "success",
      message: "Reset password email sent."
    };
  } catch (e) {
    console.error("[INITIATE_RESET_ERROR]", e);
    return {
      status: "server_error",
      message: getErrorMessage(e),
    };
  }
}

/**
 * Verifies if a reset token is still valid
 */
export async function verifyResetToken(token: string) {
  await connectDb();

  const record = await PasswordResetToken.findOne({ token });
  if (!record) {
    return { valid: false, reason: "Token not found or already used." };
  }

  if (record.expires < new Date()) {
    await PasswordResetToken.deleteOne({ token });
    return { valid: false, reason: "Token expired." };
  }

  return { valid: true };
}

/**
 * Sets a new password after token verification
 */
export async function resetPassword(token: string, newPassword: string, oldPassword?: string) {
  await connectDb();

  const resetToken = await PasswordResetToken.findOne({ token });
  if (!resetToken) {
    throw new Error("Invalid password reset token.");
  }

  if (resetToken.expires < new Date()) {
    await PasswordResetToken.deleteOne({ token });
    throw new Error("Reset token expired.");
  }

  const user = await User.findById(resetToken.userId).select("+password");
  if (!user) {
    await PasswordResetToken.deleteOne({ token });
    throw new Error("User not found.");
  }

  // ✅ if the user has an old password, check it
  if (user.password && oldPassword) {
    const valid = await ComparePassword(oldPassword, user.password);
    if (!valid) throw new Error("Current password is incorrect.");
  }

  if (newPassword.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  user.password = await HashPassword(newPassword);
  await Promise.all([user.save(), PasswordResetToken.deleteOne({ token })]);

  return {
    status: "password_reset",
    message: "Password reset successfully.",
  };
}

