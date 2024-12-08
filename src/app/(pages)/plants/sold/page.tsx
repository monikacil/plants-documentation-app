import { addPlant, getPlants } from "@/app/actions/plant.actions";
import PlantModal from "@/app/components/plants/PlantModal";
import PlantTable from "@/app/components/plants/PlantTable";
import { Plant } from "@/app/types/plantTypes";

export default async function SoldPlants() {
  const data: Plant[] = await getPlants('sold')

  return (
    <>
      <h1>Sold</h1>
      <PlantModal title="Add Plant" color="green" plantAction={ addPlant } />
      <div>
        <PlantTable data={data} />
      </div>
    </>
  );
}
