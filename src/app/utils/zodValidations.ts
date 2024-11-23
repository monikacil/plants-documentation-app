import { zodUserSchema } from "@/app/lib/zod/zod-user";

export async function zodValidation(formData: FormData) {
  const data = { email: formData.get("email"), password: formData.get("password") };
  return zodUserSchema.safeParse({
    email: data.email,
    password: data.password,
  });
}
