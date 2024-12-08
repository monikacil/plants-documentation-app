'use server';

import SoldPlant from "../models/plants/soldPlant.model";
import PurchasedPlant from "../models/plants/purchasedPlant.model"
import CollectedPlant from "../models/plants/collectedPlant.model"

import { connectDB } from "../lib/connectDB";
import { getSessionUserId } from "../helpers/session.helpers";
import { Collections } from "../types/plantTypes";
import { revalidatePath } from "next/cache";

interface Args {
  collection: Collections,
  _id?: string | undefined
}

function dataToUpdate(collection: Collections, formData: FormData) {
  return {
    species: formData.get("species"),
    variety: formData.get("variety"),
    price: formData.get("price"),
    date: formData.get("date"),
    passport: formData.get("passport"),
    [collection === 'sold' ? 'buyer' : 'seller']: {
      name: formData.get("name"),
      address: formData.get("address"),
      variety: formData.get("variety"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      country: formData.get("country"),
    },
    images: []
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPurchasedPlant = async (userId: unknown, formData: FormData) => {
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

  return data
}

export const createSoldPlant = async (userId: unknown, formData: FormData) => {
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

  return data
}

export const createCollectedPlant = async (userId: unknown, formData: FormData) => {
  const data = {
    _userId: userId,
    species: formData.get("species"),
    variety: formData.get("variety"),
    images: []
  };

  return data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addPlant = async (extraArgs: Args, prevState: object, formData: FormData) => {
  const userId = await getSessionUserId();
  let plant = null;
  let newPlant = null;

  switch (extraArgs.collection) {
    case 'purchased':
      plant = await createPurchasedPlant(userId, formData)
      newPlant = new PurchasedPlant(plant)
      break;
    case 'sold':
      plant = await createSoldPlant(userId, formData)
      newPlant = new SoldPlant(plant)
      break;
    default:
      plant = await createCollectedPlant(userId, formData)
      newPlant = new CollectedPlant(plant)
      break;
  }

  try {
    await connectDB();
    const savedPlant = await newPlant.save();
    revalidatePath('/plants/' + extraArgs.collection);
    return JSON.parse(JSON.stringify(savedPlant))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return { error: 'Error occurse when trying to save data' }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deletePlant = async (collection: Collections, plantId: string | undefined) => {
  const userId = await getSessionUserId();
  let plant;

  switch (collection) {
    case 'purchased':
      plant = PurchasedPlant
      break;
    case 'sold':
      plant = SoldPlant
      break;
    default:
      plant = CollectedPlant
      break;
  }

  try {
    await connectDB();
    await plant.deleteOne({ _id: plantId, _userId: userId })
    revalidatePath('/plants/' + collection);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return { error: 'Error occurse when trying to save data' }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const editPlant = async (extraArgs: Args, prevState: object, formData: FormData) => {

  console.log(1, extraArgs._id, formData)
  const userId = await getSessionUserId();
  let plant;

  switch (extraArgs.collection) {
    case 'purchased':
      plant = PurchasedPlant
      break;
    case 'sold':
      plant = SoldPlant
      break;
    default:
      plant = CollectedPlant
      break;
  }

  try {
    await connectDB();
    await plant.findByIdAndUpdate({ _id: extraArgs._id, _userId: userId }, dataToUpdate(extraArgs.collection, formData))
    revalidatePath('/plants/' + extraArgs.collection);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return { error: 'Error occurse when trying to save data' }
  }
}

export async function getPlants(collection: Collections = 'collected') {
  const userId = await getSessionUserId();
  await connectDB();
  // eslint-disable-next-line no-var
  let dbPlantsList;
  let plants;
  switch (collection) {
    case 'purchased':
      dbPlantsList = await PurchasedPlant.find({_userId: userId})
      plants = dbPlantsList.map(({ _id ,species, variety, images, price, date, passport, seller}) => ({_id, species, variety, images, price, date, passport, name: seller.name, address: seller.address, phone: seller.phone, email: seller.email, country: seller.countery}));
      break;
    case 'sold':
      dbPlantsList = await SoldPlant.find({ _userId: userId });
      plants = dbPlantsList.map(({ _id, species, variety, images, price, date, passport, buyer}) => ({ _id, species, variety, images, price, date, passport, name: buyer.name, address:buyer.address, phone: buyer.phone, email: buyer.email, country: buyer.countery}));
      break;
    default:
      dbPlantsList = await CollectedPlant.find({ _userId: userId });
      plants = dbPlantsList.map(({ _id, species, variety, images}) => ({ _id, species, variety, images}));
      break;
  }
  return JSON.parse(JSON.stringify(plants))
}
