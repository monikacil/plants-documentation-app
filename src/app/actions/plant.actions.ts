"use server";

import { revalidatePath } from "next/cache";

import { connectDB } from "../lib/connectDB";
import { zodPlantValidation } from "../lib/zod/zodValidations";

import { getSessionUserId } from "../helpers/session.helper";
import { getErrorMessage } from "../helpers/getErrorMessage.helper";

import { Collections, Plant, PlantExtraArgs } from "../types/plant.types";
import mongoose from "mongoose";
import { SortType } from "../types/others.types";
import { dataToUpdate, getCollectionModel, uiPlantObject } from "../helpers/plantActions.helper";

export const addPlant = async (extraArgs: PlantExtraArgs, prevState: object, formData: FormData) => {
   // zod validation
  const validation = await zodPlantValidation(formData, extraArgs.collection);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const collectionModel = getCollectionModel(extraArgs.collection)
  const userId = await getSessionUserId();
  const plant = dataToUpdate(userId, formData, extraArgs?.collection)
  const createdPlant = new collectionModel(plant)

  try {
    await connectDB();
    const savedPlant = await createdPlant.save()
    revalidatePath("/plants/[slug]");
    return JSON.parse(JSON.stringify(savedPlant))
  } catch (error) {
    return {
      message: getErrorMessage(error, "Error occurred while saving plant.")
    }
  }
}

export const deletePlant = async (collection: Collections, plantId: string) => {
  const collectionModel = getCollectionModel(collection)
  const userId = await getSessionUserId();

  try {
    await connectDB();
    await collectionModel.deleteOne({ _id: plantId, _userId: userId })
    revalidatePath("/plants/[slug]");
  } catch (error) {
      return {
      message: getErrorMessage(error, "Error occurred while deleting plant.")
    }
  }
}

export const editPlant = async (extraArgs: PlantExtraArgs, prevState: object, formData: FormData) => {
  const collectionModel = getCollectionModel(extraArgs.collection)
  const userId = await getSessionUserId();
  const data = dataToUpdate(userId, formData, extraArgs.collection)

  // zod validation
  const validation = await zodPlantValidation(formData, extraArgs.collection);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    await connectDB();
    await collectionModel.findByIdAndUpdate({ _id: extraArgs._id, _userId: userId }, data)
    revalidatePath("/plants/[slug]");
  } catch (error) {
    return {
      message: getErrorMessage(error, "Error occurred while editing plant.")
    }
  }
}

export const getPlants = async (collection: Collections, query: string, currentPage: number, limit: number, sort?: SortType[]) => {
  const collectionModel = getCollectionModel(collection);
  const userId = await getSessionUserId();

  const sortQuery = { "$sort": { } }

  if (sort) {
    sort.forEach((query) => {
      sortQuery["$sort"] = Object.assign(sortQuery["$sort"], {[query.key]: query.direction === "asc" ? 1 : -1})
    })
  } else {
    sortQuery["$sort"] = { createdAt: 1 }
  }

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
    { $limit: limit },
    sortQuery
    ])
    if (!dbPlantsList) return []

    const plants = dbPlantsList.map((plant: Plant) => {
      return uiPlantObject(plant, collection)
    });

    return JSON.parse(JSON.stringify(plants))
  } catch (error) {
      return {
        message: getErrorMessage(error, "Error occurred while fetching plants data.")
      }
  }
}

export const getPlant = async (id: string, collection: Collections = "collected") => {
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

export const fetchPlantsPages = async (query: string, collection: Collections, limit: number) => {
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
