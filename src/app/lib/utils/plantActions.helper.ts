import SoldPlant from "@/models/plants/soldPlant.model";
import PurchasedPlant from "@/models/plants/purchasedPlant.model";
import CollectedPlant from "@/models/plants/collectedPlant.model";

import { Collections, PlantDocument } from "@/types/plant.types";

import { decryptData, encryptData } from "../crypto";

export const getAdditionalDataKey = (collection: Collections) => {
  return collection === "sold" ? "buyer" : "seller";
};

export const getCollectionModel = (collection: Collections) => {
  let model;
  switch (collection) {
    case "purchased":
      model = PurchasedPlant;
      break;
    case "sold":
      model = SoldPlant;
      break;
    default:
      model = CollectedPlant;
      break;
  }

  return model;
};

export const dataToUpdate = async (
  userId: string | undefined,
  formData: FormData,
  collection: Collections
) => {
  const data = {
    _userId: userId,
    species: formData.get("species"),
    variety: formData.get("variety"),
    images: [],
  };

  if (collection === "collected") {
    return data;
  }

  return Object.assign({}, data, await additionalData(formData, collection));
};

const additionalData = async (formData: FormData, collection: Collections) => {
  const key = getAdditionalDataKey(collection);

  return {
    price: formData.get("price"),
    date: formData.get("date"),
    passport: formData.get("passport"),
    [key]: await encryptData({
      name: formData.get("name"),
      address: formData.get("address"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      country: formData.get("country"),
    }),
  };
};

export const uiPlantObject = async (
  plant: PlantDocument,
  collection: Collections
) => {
  if (!plant) return;

  const data = {
    _id: plant._id,
    species: plant.species,
    variety: plant.variety,
    images: plant.images,
  };

  if (collection === "collected") {
    return data;
  }

  const key = getAdditionalDataKey(collection);
  const decryptedData = await decryptData(plant[key]);

  const additionalFields = {
    price: plant.price,
    date: plant.date,
    passport: plant.passport,
    name: decryptedData.name,
    address: decryptedData.address,
    country: decryptedData.country,
    phone: decryptedData.phone,
    email: decryptedData.email,
  };

  return { ...data, ...additionalFields };
};
