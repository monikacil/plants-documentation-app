import { getPlants } from "@/app/actions/plant.actions";
import AddPlantModal from "@/app/components/plants/AddPlantModal";
import PlantTable from "@/app/components/plants/PlantTable";
import { Plant } from "@/app/types/plantTypes";

export default async function SoldPlants() {
  const data: Plant[] = await getPlants('sold')

  return (
    <div>
      <h1>Collection</h1>
      <AddPlantModal />
      <div>
        <PlantTable data={data} />
      </div>
    </div>
  );
}
