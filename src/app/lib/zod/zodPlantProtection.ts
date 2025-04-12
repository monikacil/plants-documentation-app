import { object, string } from "zod";

export const zodPlantProtectionSchema = object({
  date: string(),
  control: string()
    .trim()
    .refine((val) => val.length > 1, {
      message: "Control form required",
    }),
  pests: string().trim(),
  actionTaken: string()
    .trim()
    .refine((val) => val.length > 1, {
      message: "Actions required",
    }),
  exterminator: string().trim(),
  amount: string().trim(),
  species: string()
    .trim()
    .refine((val) => val.length > 1, {
      message: "Species required",
    }),
});

export type ZodPlantProtectionFormState =
  | {
    errors: {
      date: string | undefined;
      control: string | undefined;
      pests: string | undefined;
      actionTaken: string | undefined;
      exterminator: string | undefined;
      amount: string | undefined;
      species: string | undefined;
      message: string | undefined;
    };
  }
  | undefined;
