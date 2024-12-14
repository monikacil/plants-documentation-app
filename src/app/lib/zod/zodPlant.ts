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
      errors: {
        species: string[] | undefined,
        variety: string[] | undefined,
        price: string[] | undefined,
        date: string[] | undefined,
        passport: string[] | undefined,
        name: string[] | undefined,
        address: string[] | undefined,
        phone: string[] | undefined,
        email: string[] | undefined,
        country: string[] | undefined,
        messages: string[] | undefined
      }
    }
  | undefined
