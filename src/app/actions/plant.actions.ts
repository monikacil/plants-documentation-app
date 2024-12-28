"use server";

import { revalidatePath } from "next/cache";

import SoldPlant from "../models/plants/soldPlant.model";
import PurchasedPlant from "../models/plants/purchasedPlant.model"
import CollectedPlant from "../models/plants/collectedPlant.model"

import { connectDB } from "../lib/connectDB";
import { zodPlantValidation } from "../lib/zod/zodValidations";

import { getSessionUserId } from "../helpers/session.helper";
import { getErrorMessage } from "../helpers/getErrorMessage.helper";

import { Collections, PlantDocument, PlantExtraArgs } from "../types/plantTypes";
import mongoose from "mongoose";

function getCollectionModel(collection: Collections) {
  let model;
  switch (collection) {
    case "purchased":
      model = PurchasedPlant
      break;
    case "sold":
      model = SoldPlant
      break;
    default:
      model = CollectedPlant
      break;
  }
  return model
}

function getAdditionalDataKey(collection: Collections) {
   return collection === "sold" ? "buyer" : "seller"
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
  const key = getAdditionalDataKey(collection)
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

  if (collection === "collected") {
    return data
  }

  const key = getAdditionalDataKey(collection)
  const additionalFields = {
    price: plant.price,
    date: new Intl.DateTimeFormat("pl-PL").format(plant.date as Date),
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

export const addPlant = async (extraArgs: PlantExtraArgs, prevState: object, formData: FormData) => {
  const collectionModel = getCollectionModel(extraArgs.collection)
  const userId = await getSessionUserId();
  const plant = await createPlant(userId, formData, extraArgs?.collection)

   // zod validation
  const validation = await zodPlantValidation(formData, extraArgs.collection);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    await connectDB();
    const savedPlant = await new collectionModel(plant).save()
    revalidatePath("/plants/[slug]");
    return JSON.parse(JSON.stringify(savedPlant))
  } catch (error) {
    return {
      message: getErrorMessage(error, "Error occurred while saving plant.")
    }
  }
}

export const deletePlant = async (collection: Collections, plantId: string) => {
  console.log('deleeeeeete')
  const collectionModel = getCollectionModel(collection)
  const userId = await getSessionUserId();

  try {
    await connectDB();
    await collectionModel.deleteOne({ _id: plantId, _userId: userId })
    revalidatePath("/plants/[slug]");
    return {message: "success"}
  } catch (error) {
     return {
      message: getErrorMessage(error, "Error occurred while deleting plant.")
    }
  }
}

export const editPlant = async (extraArgs: PlantExtraArgs, prevState: object, formData: FormData) => {
  const collectionModel = getCollectionModel(extraArgs.collection)
  const userId = await getSessionUserId();

  // zod validation
  const validation = await zodPlantValidation(formData, extraArgs.collection);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    await connectDB();
    await collectionModel.findByIdAndUpdate({ _id: extraArgs._id, _userId: userId }, dataToUpdate(userId, formData, extraArgs.collection))
    revalidatePath("/plants/[slug]");
  } catch (error) {
    return {
      message: getErrorMessage(error, "Error occurred while editing plant.")
    }
  }
}

export async function searchPlants(collection: Collections, searchString: string) {
  const collectionModel = getCollectionModel(collection);
  try {
    await connectDB();
    const dbPlantsList = await collectionModel.aggregate([{
      $match: {
        $or: [
          { "species": { $regex: ".*" + searchString + ".*", $options: "i" } },
          { "variety": { $regex: ".*" + searchString + ".*", $options: "i" } },
        ]
      }
    }])
    if (!dbPlantsList) return []

    const plants = dbPlantsList.map((plant: PlantDocument) => {
      return uiPlantObject(plant, collection)
    });

    return JSON.parse(JSON.stringify(plants))
  } catch (error) {
    return {
      message: getErrorMessage(error, "Something went wrong.")
    }
  }
}

export async function getPlants(collection: Collections = "collected", query: string, currentPage: number, limit: number) {
  const collectionModel = getCollectionModel(collection);
  const userId = await getSessionUserId();

  try {
    await connectDB();
    const dbPlantsList =  await collectionModel.aggregate([{
      $match: {
        _userId: new mongoose.Types.ObjectId(userId),
        $or: [
          { "species": { $regex: ".*" + query + ".*", $options: "i" } },
          { "variety": { $regex: ".*" + query + ".*", $options: "i" } },
        ]
      }
    },
    { $skip: (currentPage - 1) * limit },
    { $limit: limit }
    ])
    if (!dbPlantsList) return []

    const plants = dbPlantsList.map((plant: PlantDocument) => {
      return uiPlantObject(plant, collection)
    });

    return JSON.parse(JSON.stringify(plants))
  } catch (error) {
      return {
        message: getErrorMessage(error, "Error occurred while fetching plants data.")
      }
  }
}

export async function getPlant(id: string, collection: Collections = "collected") {
  const collectionModel = getCollectionModel(collection)
  const userId = await getSessionUserId();

  try {
    await connectDB();
    const dbPlant = await collectionModel.findOne({_id: id, _userId: userId})
    return JSON.parse(JSON.stringify(uiPlantObject(dbPlant, collection)))
  } catch (error) {
    return {
      message: getErrorMessage(error, "Error occurred while fetching plant data.")
    }
  }
}

export async function fetchPlantsPages(query: string, collection: Collections, limit: number) {
  const collectionModel = getCollectionModel(collection);
  const userId = await getSessionUserId();

  try {
    await connectDB();
    const dbPlantsList =  await collectionModel.aggregate([{
      $match: {
        _userId: new mongoose.Types.ObjectId(userId),
        $or: [
          { "species": { $regex: ".*" + query + ".*", $options: "i" } },
          { "variety": { $regex: ".*" + query + ".*", $options: "i" } },
        ]
      }
    }])
    return Math.ceil(dbPlantsList.length / limit)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
      return 1
  }
}
