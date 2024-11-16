import { object, string } from "zod"

export const zodSchema = object({
  email: string({ required_error: "Email is required" })
    .email("Invalid email address format")
    .trim(),
  password: string({ required_error: "Password is required" })
    // .min(8, "Password must be longer than 8 characters")
    // .max(32, "Password must be less than 32 characters")
    // .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    // .regex(/[0-9]/, { message: 'Contain at least one number.' })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: 'Contain at least one special character.',
    // })
    .trim(),
})

export type FormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
        form?: string[]
      }
      message?: string
    }
  | undefined

  export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};
