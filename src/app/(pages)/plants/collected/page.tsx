import { getPlants } from "@/app/actions/plant.actions";
import { Plant } from "@/app/types/plantTypes";

import PlantsFormWrapper from "@/app/components/plants/PlantsFormWrapper"

export default async function CollectedPlants() {
  const data: Plant[] = await getPlants('collected')

  return (
    <>
      <h1>Collection</h1>
      <PlantsFormWrapper plants={ data } />
    </>
  );
}
