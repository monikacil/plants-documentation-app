import { PlantCareDocument } from "@/app/types/plantCare.types";

export function uiPlantCareObj(plantCare: PlantCareDocument) {
  return {
    _id: plantCare._id,
    date: plantCare.date,
    control: plantCare.control,
    pests: plantCare.pests,
    antiPestActions: plantCare.antiPestActions,
    pestControlMeasures: plantCare.pestControlMeasures,
    plantsCount: plantCare.plantsCount,
    species: plantCare.species,
  };
}
