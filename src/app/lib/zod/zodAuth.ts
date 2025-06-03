import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Name is required"),
});

export type AuthFormState =
  | { success: true, status?: string }
  | {
  success?: false
  error?: Record<string, string[]>
  errorMessage?: string
  status?: string
}

export const initResetPasswordSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
});
