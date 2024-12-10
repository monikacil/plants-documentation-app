import { addPlant, getPlants } from "@/app/actions/plant.actions";
import PlantModal from "@/app/components/plants/PlantModal";
import PlantTable from "@/app/components/plants/PlantTable";
import { Plant } from "@/app/types/plantTypes";

export default async function PurchasedPlants() {
    const data: Plant[] = await getPlants('purchased')

  return (
    <>
      <h1>Purchased</h1>
      <PlantModal title="Add Plant" color="success" plantAction={ addPlant } />
      <div>
        <PlantTable data={data} />
      </div>
    </>
  );
}
