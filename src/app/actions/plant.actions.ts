'use server';

import SoldPlant from "../models/plants/soldPlant.model";
import PurchasedPlant from "../models/plants/purchasedPlant.model"
import CollectedPlant from "../models/plants/collectedPlant.model"

import { connectDB } from "../lib/connectDB";
import { getSessionUserId } from "../helpers/session.helpers";
import { Collections } from "../types/plantTypes";

const userId = await getSessionUserId();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addSoldPlant = async (prevState: any, formData: FormData) => {
  const data = {
    _userId: userId,
    species: formData.get("species"),
    variety: formData.get("variety"),
    price: formData.get("price"),
    date: formData.get("date"),
    passport: formData.get("passport"),
    buyer: {
      name: formData.get("name"),
      address: formData.get("address"),
      variety: formData.get("variety"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      country: formData.get("country"),
    },
    images: []
  };

  await connectDB();

  const newPlant = new SoldPlant(data);
  const savedPlant = await newPlant.save();

  return savedPlant
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addPurchasedPlant = async (prevState: any, formData: FormData) => {
  const data = {
    _userId: userId,
    species: formData.get("species"),
    variety: formData.get("variety"),
    price: formData.get("price"),
    date: formData.get("date"),
    passport: formData.get("passport"),
    seller: {
      name: formData.get("name"),
      address: formData.get("address"),
      variety: formData.get("variety"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      country: formData.get("country"),
    },
    images: []
  };

  await connectDB();

  const newPlant = new PurchasedPlant(data)
  const savedPlant = await newPlant.save();

  return savedPlant
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addCollectedPlant = async (prevState: any, formData: FormData) => {
  const data = {
    _userId: userId,
    species: formData.get("species"),
    variety: formData.get("variety"),
    images: []
  };

  await connectDB();

  const newPlant = new CollectedPlant(data)
  const savedPlant = await newPlant.save();

  return savedPlant
}

export async function getPlants(collection: Collections = 'collected') {
  await connectDB();
  // eslint-disable-next-line no-var
  var plants;
  switch (collection) {
    case 'purchased':
        plants = await PurchasedPlant.find({_userId: userId});
        break;
    case 'sold':
        plants = await SoldPlant.find({_userId: userId});
        break;
    default:
        plants = await CollectedPlant.find({_userId: userId});
        break;
  }
  return plants
}
