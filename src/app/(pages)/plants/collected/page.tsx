import { getPlants } from "@/app/actions/plant.actions";
import AddPlantModal from "@/app/components/plants/AddPlantModal";
import PlantTable from "@/app/components/plants/PlantTable";

interface Plant {
  species: string,
  variety: string,
  images?: []
}

export default async function CollectedPlants() {
  const data: Plant[] = await getPlants('collected')
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
