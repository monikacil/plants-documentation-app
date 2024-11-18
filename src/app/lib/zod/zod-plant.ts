import { date, object, string, number } from "zod"

export const zodPlantSchema = object({
  species: string()
    .trim()
    .refine((val) => val.length > 1, {
      message: "Species is required",
    }),
  variety: string()
    .trim()
    .refine((val) => val.length > 1, {
      message: "Variety is required",
    }),
  price: string()
    .trim(),
  date: date(),
  passport: string()
    .trim()
    .refine((val) => val.length > 1, {
      message: "Passport number is required",
    }),
  name: string()
    .trim()
    .refine((val) => val.length > 1, {
      message: "Buyer name is required",
    }),
  address: string()
    .trim(),
  phone: number(),
  email: string()
    .email("Invalid email address format")
    .trim()
    .refine((val) => val.length > 1, {
      message: "Buyer email is required",
    }),
  country: string()
    .trim(),
})

export type PlantFormState =
  | {
      errors?: {
        species?: string[]
        variety?: string[]
        price?: string[]
        date?: string[]
        passport?: string[]
        name?: string[]
        address?: string[]
        phone?: string[]
        email?: string[]
        country?: string[]
        messages?: string[]
      }
    }
  | undefined
