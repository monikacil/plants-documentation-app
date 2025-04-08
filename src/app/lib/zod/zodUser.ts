import { object, string } from "zod";

export const zodUserSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email")
    .trim(),
  password: string()
    .min(8, "Password must be longer than 8 characters")
    .max(32, "Password must be less than 32 characters")
    .trim(),
});

export type AuthFormState =
  | {
    errors: {
      email: string[] | undefined;
      password: string[] | undefined;
      message: string | undefined;
    };
  }
  | undefined;
