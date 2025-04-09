"use server";

import { revalidatePath } from "next/cache";

import { dbConnect } from "@/lib/dbConnect";
import { getSessionUserId } from "@/lib/utils/session.helper";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";

import { SortType } from "@/types/others.types";
import PlantCare from "../models/plantCare.model";
import { zodPlantCareValidation } from "../lib/zod/zodValidations";
import { uiPlantCareObj } from "../lib/utils/plantCareActions.helper";

export const getPlantCares = async (
  query: string,
  currentPage: number,
  limit: number,
  sort?: SortType[]
) => {
  const userId = await getSessionUserId();
  const sortQuery = { $sort: {} };

  if (sort) {
    sort.forEach((query) => {
      sortQuery["$sort"] = Object.assign(sortQuery["$sort"], {
        [query.key]: query.direction === "asc" ? 1 : -1,
      });
    });
  } else {
    sortQuery["$sort"] = { createdAt: 1 };
  }

  try {
    await dbConnect();
    const dbPlantCareList = await PlantCare.aggregate([
      {
        $match: {
          _userId: userId,
          $or: [
            { control: { $regex: ".*" + query + ".*", $options: "i" } },
            { pests: { $regex: ".*" + query + ".*", $options: "i" } },
            { actions: { $regex: ".*" + query + ".*", $options: "i" } },
          ],
        },
      },
      { $skip: (currentPage - 1) * limit },
      { $limit: limit },
      sortQuery,
    ]);

    if (!dbPlantCareList) return [];
    return JSON.parse(
      JSON.stringify(dbPlantCareList.map((el) => uiPlantCareObj(el)))
    );
  } catch (error) {
    return {
      message: getErrorMessage(
        error,
        "Error occurred while fetching plant care data."
      ),
    };
  }
};

export const addPlantCare = async (
  id: string | undefined,
  prevState: unknown,
  formData: FormData
) => {
  if (id) return;
  // zod validation
  const validation = await zodPlantCareValidation(formData);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }
  const userId = await getSessionUserId();

  const data = {
    ...validation.data,
    _userId: userId,
    date: Date.parse(validation.data.date),
    plantsCount: parseInt(validation.data.plantsCount),
  };
  const createdPlantCare = await new PlantCare(data);

  try {
    await dbConnect();
    const savedPlantCare = await createdPlantCare.save();
    revalidatePath("/plantCare");
    return JSON.parse(JSON.stringify(savedPlantCare));
  } catch (error) {
    return {
      message: getErrorMessage(
        error,
        "Error occurred while saving plant care."
      ),
    };
  }
};

export const deletePlantCare = async (id: string) => {
  const userId = await getSessionUserId();

  try {
    await dbConnect();
    await PlantCare.deleteOne({ _id: id, _userId: userId });
    revalidatePath("/plantCare");
  } catch (error) {
    return {
      message: getErrorMessage(
        error,
        "Error occurred while deleting plant care."
      ),
    };
  }
};

export const editPlantCare = async (
  id: string | undefined,
  prevState: object,
  formData: FormData
) => {
  if (!id) return;
  // zod validation
  const validation = await zodPlantCareValidation(formData);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const userId = await getSessionUserId();
  const data = {
    ...validation.data,
    date: Date.parse(validation.data.date),
    plantsCount: parseInt(validation.data.plantsCount),
  };

  try {
    await dbConnect();
    await PlantCare.findByIdAndUpdate({ _id: id, _userId: userId }, data);
    revalidatePath("/plantCare");
  } catch (error) {
    return {
      message: getErrorMessage(
        error,
        "Error occurred while editing plant care."
      ),
    };
  }
};

export const getPlantCare = async (id: string) => {
  const userId = await getSessionUserId();

  try {
    await dbConnect();
    const care = await PlantCare.findOne({ _id: id, _userId: userId });
    return JSON.parse(JSON.stringify(uiPlantCareObj(care)));
  } catch (error) {
    return {
      message: getErrorMessage(
        error,
        "Error occurred while getting plant care."
      ),
    };
  }
};

export const getPlantCarePages = async (query: string, limit: number) => {
  const userId = await getSessionUserId();

  try {
    await dbConnect();
    const care = await PlantCare.aggregate([
      {
        $match: {
          _userId: userId,
          $or: [
            { control: { $regex: ".*" + query + ".*", $options: "i" } },
            { pests: { $regex: ".*" + query + ".*", $options: "i" } },
            { actions: { $regex: ".*" + query + ".*", $options: "i" } },
          ],
        },
      },
    ]);
    return Math.ceil(care.length / limit);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return -1;
  }
};
