"use server";

import { revalidatePath } from "next/cache";

import { dbConnect } from "@/lib/dbConnect";
import { getSessionUserId } from "@/lib/utils/session.helper";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";

import { SortType } from "@/types/others.types";
import { zodPlantProtectionValidation } from "../lib/zod/zodValidations";
import type { PlantProtectionDocument } from "@/types/plantProtection.types";
import PlantProtection from "@/models/plantProtection.model";
import { uiPlantProtectionObj } from "@/lib/utils/plantProtectionActions.helper";

export const getPlantProtections = async (
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
    const dbPlantProtectionList = await PlantProtection.aggregate([
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

    if (!dbPlantProtectionList) return [];
    const plantsProtection = await Promise.all(dbPlantProtectionList.map(async (plantProtection: PlantProtectionDocument) => {
      return await uiPlantProtectionObj(plantProtection);
    }));
    return JSON.parse(JSON.stringify(plantsProtection));
  } catch (error) {
    return {
      message: getErrorMessage(
        error,
        "Error occurred while fetching plant Protection data."
      ),
    };
  }
};

export const addPlantProtection = async (
  id: string | undefined,
  prevState: unknown,
  formData: FormData
) => {
  console.log(276712371253)
  if (id) return;
  // zod validation
  const validation = await zodPlantProtectionValidation(formData);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const userId = await getSessionUserId();
  const data = { _userId: userId, ...validation.data };
  const createdPlantProtection = await new PlantProtection(data);

  console.log(data)

  try {
    await dbConnect();
    await createdPlantProtection.save();
    revalidatePath("/plantProtection");
  } catch (error) {
    return {
      message: getErrorMessage(
        error,
        "Error occurred while saving plant Protection."
      ),
    };
  }
};

export const deletePlantProtection = async (id: string) => {
  const userId = await getSessionUserId();

  try {
    await dbConnect();
    await PlantProtection.deleteOne({ _id: id, _userId: userId });
    revalidatePath("/plantProtection");
  } catch (error) {
    return {
      message: getErrorMessage(
        error,
        "Error occurred while deleting plant Protection."
      ),
    };
  }
};

export const editPlantProtection = async (
  id: string | undefined,
  prevState: object,
  formData: FormData
) => {
  if (!id) return;
  // zod validation
  const validation = await zodPlantProtectionValidation(formData);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const userId = await getSessionUserId();
  const data = { _userId: userId, ...validation.data };

  try {
    await dbConnect();
    await PlantProtection.findByIdAndUpdate({ _id: id, _userId: userId }, data);
    revalidatePath("/plant-protection");
  } catch (error) {
    return {
      message: getErrorMessage(
        error,
        "Error occurred while editing plant protection."
      ),
    };
  }
};

export const getPlantProtection = async (id: string) => {
  const userId = await getSessionUserId();

  try {
    await dbConnect();
    const Protection = await PlantProtection.findOne({ _id: id, _userId: userId });
    return JSON.parse(JSON.stringify(await uiPlantProtectionObj(Protection)));
  } catch (error) {
    return {
      message: getErrorMessage(
        error,
        "Error occurred while getting plant protection."
      ),
    };
  }
};

export const getPlantProtectionPages = async (query: string, limit: number) => {
  const userId = await getSessionUserId();

  try {
    await dbConnect();
    const Protection = await PlantProtection.aggregate([
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
    return Math.ceil(Protection.length / limit);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return -1;
  }
};
