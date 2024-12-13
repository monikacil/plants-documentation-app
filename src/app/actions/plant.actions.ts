'use server';

import { revalidatePath } from "next/cache";

import SoldPlant from "../models/plants/soldPlant.model";
import PurchasedPlant from "../models/plants/purchasedPlant.model"
import CollectedPlant from "../models/plants/collectedPlant.model"

import { connectDB } from "../lib/connectDB";
import { getSessionUserId } from "../helpers/session.helpers";
import { Collections, PlantDocument } from "../types/plantTypes";
import { zodPlantValidation } from "../lib/zod/zodValidations";

interface Args {
  collection: Collections,
  _id?: string | undefined
}

function dataToUpdate( userId: unknown, formData: FormData, collection: Collections | undefined,) {
  const data = {
    _userId: userId,
    species: formData.get("species"),
    variety: formData.get("variety"),
    images: []
  }

  if (!collection) {
    return data
  }

  return Object.assign({}, data, additionalData(formData, collection));
}

function additionalData(formData: FormData, collection: Collections) {
  const key = collection === "sold" ? 'buyer' : 'seller'
  return {
    price: formData.get("price"),
    date: formData.get("date"),
    passport: formData.get("passport"),
    [key]: {
      name: formData.get("name"),
      address: formData.get("address"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      country: formData.get("country"),
    },
  }
}

function uiPlantObject(plant: PlantDocument, collection: Collections) {
  if (!plant) return
  const data = {
    _id: plant._id,
    species: plant.species,
    variety: plant.variety,
    images: plant.images
  }

  if (collection === 'collected') {
    return data
  }

  const key = collection === "sold" ? 'buyer' : 'seller'
  const additionalFields = {
    price: plant.price,
    date: new Intl.DateTimeFormat('pl-PL').format(plant.date as Date),
    passport: plant.passport,
    name: plant[key]?.name,
    address: plant[key]?.address,
    country: plant[key]?.country,
    phone: plant[key]?.phone,
    email: plant[key]?.email,
  }

  return { ...data, ...additionalFields };

}

async function createPlant (userId: unknown, formData: FormData, collection: Collections) {
  return dataToUpdate(userId, formData, collection)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addPlant = async (extraArgs: Args, prevState: object, formData: FormData) => {
  const userId = await getSessionUserId();
  let plant = null;
  let newPlant = null;

   // zod validation
  const validation = await zodPlantValidation(formData, extraArgs.collection);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  plant = await createPlant(userId, formData, extraArgs?.collection)

  switch (extraArgs.collection) {
    case 'purchased':
      newPlant = new PurchasedPlant(plant)
      break;
    case 'sold':
      newPlant = new SoldPlant(plant)
      break;
    default:
      newPlant = new CollectedPlant(plant)
      break;
  }

  try {
    await connectDB();
    const savedPlant = await newPlant.save();
    revalidatePath('/plants/[slug]');
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
    revalidatePath('/plants/[slug]');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return { error: 'Error occurse when trying to save data' }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const editPlant = async (extraArgs: Args, prevState: object, formData: FormData) => {
  // zod validation
  const validation = await zodPlantValidation(formData, extraArgs.collection);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }
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
    await plant.findByIdAndUpdate({ _id: extraArgs._id, _userId: userId }, dataToUpdate(userId, formData, extraArgs.collection))
    revalidatePath('/plants/[slug]');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return { error: 'Error occurse when trying to save data' }
  }
}

export async function searchPlants(collection: Collections, searchString: string) {
  let dbPlantsList;
  switch (collection) {
    case 'purchased':
      dbPlantsList = await PurchasedPlant.aggregate([{
        $match: {
          $or: [
          { "species": { $regex: '.*' + searchString + '.*', $options: 'i' } },
          { "variety": { $regex:'.*' + searchString + '.*',$options: 'i' } },
          ]
        }
      }])
      break;
    case 'sold':
      dbPlantsList = await SoldPlant.aggregate([{
        $match: {
          $or: [
          { "species": { $regex: '.*' + searchString + '.*', $options: 'i' } },
          { "variety": { $regex:'.*' + searchString + '.*',$options: 'i' } },
          ]
        }
      }])
      break;
    default:
      dbPlantsList = await CollectedPlant.aggregate([{
        $match: {
          $or: [
          { "species": { $regex: '.*' + searchString + '.*', $options: 'i' } },
          { "variety": { $regex:'.*' + searchString + '.*',$options: 'i' } },
          ]
        }
      }])
      break;
  }
  if (!dbPlantsList) return []
  const plants = dbPlantsList.map((plant: PlantDocument) => {
    return uiPlantObject(plant, collection)
  });

  return JSON.parse(JSON.stringify(plants))
}

export async function getPlants(collection: Collections = 'collected') {
  const userId = await getSessionUserId();
  await connectDB();
  // eslint-disable-next-line no-var
  let dbPlantsList;
  switch (collection) {
    case 'purchased':
      dbPlantsList = await PurchasedPlant.find({ _userId: userId })
      break;
    case 'sold':
      dbPlantsList = await SoldPlant.find({ _userId: userId });
      break;
    default:
      dbPlantsList = await CollectedPlant.find({ _userId: userId });
      break;
  }
  if (!dbPlantsList) return []

  const plants = dbPlantsList.map((plant: PlantDocument) => {
    return uiPlantObject(plant, collection)
  });

  return JSON.parse(JSON.stringify(plants))
}

export async function getPlant(id: string, collection: Collections = 'collected') {
  const userId = await getSessionUserId();
  await connectDB();
  // eslint-disable-next-line no-var
  let dbPlant;
  switch (collection) {
    case 'purchased':
      dbPlant = await PurchasedPlant.findOne({_id: id, _userId: userId})
      break;
    case 'sold':
      dbPlant = await SoldPlant.findOne({_id: id, _userId: userId})
      break;
    default:
      dbPlant = await CollectedPlant.findOne({_id: id, _userId: userId})
      break;
  }
  if (!dbPlant) return null

  return JSON.parse(JSON.stringify(dbPlant))
}
