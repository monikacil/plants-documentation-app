import { object, string } from "zod"

export const zodExpenseSchema = object({
  products: string()
    .trim()
    .refine((val) => val.length > 1, {
      message: "Email required",
  }),
  price: string()
    .trim()
    .refine((val) => val.length > 1, {
      message: "Price required",
  }),
  shop: string()
    .trim()
    .refine((val) => val.length > 1, {
      message: "Shop required",
  }),
  date: string()
})

export type ZodFormState =
  | {
      errors: {
        product: string | undefined,
        price: string | undefined,
        shop: string | undefined,
        date: string | undefined,
        message: string | undefined
      }
    }
  | undefined
