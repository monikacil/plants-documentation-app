'use client'

import { addPlant } from "@/app/actions/plant.actions";
import PlantModal from "@/app/components/plants/PlantModal";
import PlantTable from "@/app/components/plants/PlantTable";
import { Plant } from "@/app/types/plantTypes";

export default function PlantsFormWrapper({ plants }: { plants: Plant[] }) {

  return (
    <>
      <PlantModal title="Add Plant" color="success" plantAction={addPlant} />
      <div>
        <PlantTable data={plants} />
      </div>
    </>
  );
}




