import { zodCollectedPlantSchema, zodPlantSchema } from "./zodPlant";
import { Collections } from "@/app/types/plant.types";
import { zodExpenseSchema } from "./zodExpense";
import { zodPlantProtectionSchema } from "./zodPlantProtection";

export async function zodExpenseValidation(formData: FormData) {
  const data = {
    products: formData.get("products"),
    price: formData.get("price"),
    shop: formData.get("shop"),
    date: formData.get("date"),
  };
  return zodExpenseSchema.safeParse({
    products: data.products,
    price: data.price,
    shop: data.shop,
    date: data.date,
  });
}

export async function zodPlantValidation(
  formData: FormData,
  collection: Collections
) {
  const data = {
    species: formData.get("species"),
    variety: formData.get("variety"),
    price: formData.get("price"),
    date: formData.get("date"),
    passport: formData.get("passport"),
    name: formData.get("name"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    country: formData.get("country"),
  };
  if (collection !== "collected") {
    return zodPlantSchema.safeParse({
      species: data.species,
      variety: data.variety,
      price: data.price,
      date: data.date,
      passport: data.passport,
      name: data.name,
      address: data.address,
      phone: data.phone,
      email: data.email,
      country: data.country,
    });
  }
  return zodCollectedPlantSchema.safeParse({
    species: data.species,
    variety: data.variety,
  });
}

export async function zodPlantProtectionValidation(formData: FormData) {
  const data = {
    date: formData.get("date"),
    control: formData.get("control"),
    pests: formData.get("pests"),
    actionTaken: formData.get("actionTaken"),
    exterminator: formData.get("exterminator"),
    amount: formData.get("amount"),
    species: formData.get("species"),
  };
  return zodPlantProtectionSchema.safeParse({
    date: data.date,
    control: data.control,
    pests: data.pests,
    actionTaken: data.actionTaken,
    exterminator: data.exterminator,
    amount: data.amount,
    species: data.species,
  });
}
