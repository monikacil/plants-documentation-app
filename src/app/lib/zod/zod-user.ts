import { object, string } from "zod"

export const zodUserSchema = object({
  email: string()
    .email("Invalid email address format")
    .trim()
    .refine((val) => val.length > 1, {
      message: "Email required",
    }),
  password: string()
    .min(8, "Password must be longer than 8 characters")
    .max(32, "Password must be less than 32 characters")
    .trim(),
})

export type AuthFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
        message?: string
      }
    }
  | undefined
