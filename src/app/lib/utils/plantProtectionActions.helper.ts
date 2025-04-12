import { PlantProtectionDocument } from "@/types/plantProtection.types";

export async function uiPlantProtectionObj(plantCare: PlantProtectionDocument) {
  return {
    _id: plantCare._id,
    date: plantCare.date,
    control: plantCare.control,
    pests: plantCare.pests,
    actionTaken: plantCare.actionTaken,
    exterminator: plantCare.exterminator,
    amount: plantCare.amount,
    species: plantCare.species,
  };
}
