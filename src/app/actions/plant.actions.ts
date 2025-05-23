"use server";

import { revalidatePath } from "next/cache";

import { dbConnect } from "@/app/mongoose/db.ts";
import { zodPlantValidation } from "@/app/lib/zod/zodValidations";

import { getErrorMessage } from "@/app/lib/utils/getErrorMessage";


import { PlantDocument, } from "@/app/mongoose/types/plant.types";
import { SortType } from "@/app/mongoose/types/others.types";

export const addPlant = async (
  extraArgs: PlantExtraArgs,
  prevState: object,
  formData: FormData
) => {
  // zod validation
  const validation = await zodPlantValidation(formData, extraArgs.collection);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const collectionModel = getCollectionModel(extraArgs.collection);
  const userId = await getSessionUserId();
  const plant = await dataToUpdate(userId, formData, extraArgs?.collection);
  const createdPlant = new collectionModel(plant);

  try {
    await dbConnect();
    const savedPlant = await createdPlant.save();
    revalidatePath("/plants/[slug]");
    return JSON.parse(JSON.stringify(savedPlant));
  } catch (error) {
    return {
      message: getErrorMessage(error, "Error occurred while saving plant."),
    };
  }
};

export const deletePlant = async (
  id: string,
  slug: Collections | undefined
) => {
  if (!slug) return;
  const collectionModel = getCollectionModel(slug);
  const userId = await getSessionUserId();

  try {
    await dbConnect();
    await collectionModel.deleteOne({ _id: id, _userId: userId });
    revalidatePath("/plants/[slug]");
  } catch (error) {
    return {
      message: getErrorMessage(error, "Error occurred while deleting plant."),
    };
  }
};

export const editPlant = async (
  extraArgs: PlantExtraArgs,
  prevState: object,
  formData: FormData
) => {
  // zod validation
  const validation = await zodPlantValidation(formData, extraArgs.collection);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const collectionModel = getCollectionModel(extraArgs.collection);
  const userId = await getSessionUserId();

  const data = await dataToUpdate(userId, formData, extraArgs.collection);

  try {
    await dbConnect();
    await collectionModel.findByIdAndUpdate(
      { _id: extraArgs.id, _userId: userId },
      data
    );
    revalidatePath("/plants/[slug]");
  } catch (error) {
    return {
      message: getErrorMessage(error, "Error occurred while editing plant."),
    };
  }
};

export const getPlants = async (
  collection: Collections,
  query: string,
  currentPage: number,
  limit: number,
  sort?: SortType[]
) => {
  const collectionModel = getCollectionModel(collection);
  const userId = await getSessionUserId();

  const sortQuery = { $sort: {} };

  if (sort) {
    sort.forEach((query) => {
      if (!query) return;
      sortQuery[ "$sort" ] = Object.assign(sortQuery[ "$sort" ], {
        [ query.key ]: query.direction === "asc" ? 1 : -1,
      });
    });
  } else {
    sortQuery[ "$sort" ] = { createdAt: -1 };
  }

  try {
    await dbConnect();
    const dbPlantsList = await collectionModel.aggregate([
      {
        $match: {
          _userId: userId,
          $or: [
            { species: { $regex: ".*" + query + ".*", $options: "i" } },
            { variety: { $regex: ".*" + query + ".*", $options: "i" } },
          ],
        },
      },
      { $skip: (currentPage - 1) * limit },
      { $limit: limit },
      sortQuery,
    ]);
    if (!dbPlantsList) return [];

    const plants = await Promise.all(dbPlantsList.map(async (plant: PlantDocument) => {
      return await uiPlantObject(plant, collection);
    }));

    return JSON.parse(JSON.stringify(plants));
  } catch (error) {
    return {
      message: getErrorMessage(
        error,
        "Error occurred while fetching plants data."
      ),
    };
  }
};

export const getPlant = async (
  id: string,
  collection: Collections = "collected"
) => {
  const collectionModel = getCollectionModel(collection);
  const userId = await getSessionUserId();

  try {
    await dbConnect();
    const dbPlant = await collectionModel.findOne({ _id: id, _userId: userId });
    if (!dbPlant) {
      throw new Error("Plant not found");
    }

    const uiPlant = await uiPlantObject(dbPlant, collection);
    if (!uiPlant) {
      throw new Error("Failed to transform plant object");
    }
    return JSON.parse(JSON.stringify(uiPlant));
  } catch (error) {
    return {
      message: getErrorMessage(
        error,
        "Error occurred while fetching plant data."
      ),
    };
  }
};

export const getPlantsPages = async (
  query: string,
  collection: Collections,
  limit: number
) => {
  const collectionModel = getCollectionModel(collection);
  const userId = await getSessionUserId();

  try {
    await dbConnect();
    const dbPlantsList = await collectionModel.aggregate([
      {
        $match: {
          _userId: userId,
          $or: [
            { species: { $regex: ".*" + query + ".*", $options: "i" } },
            { variety: { $regex: ".*" + query + ".*", $options: "i" } },
          ],
        },
      },
    ]);
    return Math.ceil(dbPlantsList.length / limit);
    // eslint-disable-next-line @/app/typescript-eslint/no-unused-vars
  } catch (error) {
    return -1;
  }
};
