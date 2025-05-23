import { object, string } from "zod";

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
  date: string(),
});
