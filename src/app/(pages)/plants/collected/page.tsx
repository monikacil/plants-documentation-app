import { addPlant, getPlants } from "@/app/actions/plant.actions";
import { Plant } from "@/app/types/plantTypes";

// import PlantsFormWrapper from "@/app/components/plants/PlantsFormWrapper"
import PlantModal from "@/app/components/plants/PlantModal";
import PlantTable from "@/app/components/plants/PlantTable";

export default async function CollectedPlants() {
  const data: Plant[] = await getPlants('collected')

  return (
    <>
      <h1>Collection</h1>
        <PlantModal title="Add Plant" color="success" plantAction={ addPlant } />
      <div>
        <PlantTable data={data} />
      </div>
    </>
  );
}
