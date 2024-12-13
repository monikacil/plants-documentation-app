import { object, string } from "zod"


export const zodCollectedPlantSchema = object({
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
})

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
  date: string(),
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
  phone: string(),
  email: string()
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
