import { object, string } from "zod";

export const zodPlantCareSchema = object({
  date: string().trim(),
  control: string()
    .trim()
    .refine((val) => val.length > 1, {
      message: "Control form required",
    }),
  pests: string().trim(),
  antiPestActions: string()
    .trim()
    .refine((val) => val.length > 1, {
      message: "Actions required",
    }),
  pestControlMeasures: string().trim(),
  plantsCount: string().trim(),
  species: string()
    .trim()
    .refine((val) => val.length > 1, {
      message: "Species required",
    }),
});

export type ZodFormState =
  | {
      errors: {
        date: string | undefined;
        control: string | undefined;
        pests: string | undefined;
        antiPestActions: string | undefined;
        pestControlMeasures: string | undefined;
        plantsCount: string | undefined;
        species: string | undefined;
        message: string | undefined;
      };
    }
  | undefined;
