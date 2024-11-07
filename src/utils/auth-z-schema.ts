import { z } from "zod"

export const schemaRegister = z.object({
  password: z.string().min(8).max(30, {
    message: "Password must be between 8 and 30 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});
