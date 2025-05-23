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
