'use server';

import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next/server';

import SoldPlant from "../models/plants/soldPlant.model";
import PurchasedPlant from "../models/plants/purchasedPlant.model"
import CollectedPlant from "../models/plants/collectedPlant.model"

import { connectDB } from "../lib/connectDB";
import { decrypt } from "../lib/joseSession";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addSoldPlant = async (prevState: any, formData: FormData) => {
  const cookie =  await getCookie('plant-doc-session', { cookies });
  const session = await decrypt(cookie)

  const data = {
    _userId: session?.userId,
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

  const newPlant = new SoldPlant(data)
  const savedPlant = await newPlant.save();

  return savedPlant
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addPurchasedPlant = async (prevState: any, formData: FormData) => {
  const cookie =  await getCookie('plant-doc-session', { cookies });
  const session = await decrypt(cookie)

  const data = {
     _userId: session?.userId,
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
  const cookie =  await getCookie('plant-doc-session', { cookies });
  const session = await decrypt(cookie)

  const data = {
     _userId: session?.userId,
    species: formData.get("species"),
    variety: formData.get("variety"),
    images: []
  };

  await connectDB();

  const newPlant = new CollectedPlant(data)
  const savedPlant = await newPlant.save();

  return savedPlant
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCollectedPlant = async () => {
  const cookie =  await getCookie('plant-doc-session', { cookies });
  const session = await decrypt(cookie)
  await connectDB();
  const plants = await CollectedPlant.find({_userId: session?.userId});

  return plants
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPurchasedPlant = async () => {
  const cookie =  await getCookie('plant-doc-session', { cookies });
  const session = await decrypt(cookie)
  await connectDB();
  const plants = await PurchasedPlant.find({_userId: session?.userId});

  return plants
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSoldPlant = async () => {
  const cookie =  await getCookie('plant-doc-session', { cookies });
  const session = await decrypt(cookie)
  await connectDB();
  const plants = await SoldPlant.find({_userId: session?.userId});

  return plants
}
