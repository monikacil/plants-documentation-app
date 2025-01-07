import { getPlant } from "@/app/actions/plant.actions";
import PlantDetails from "@/app/components/plants/PlantDetails";
import { Collections, PlantDocument } from "@/app/types/plant.types";

export default async function Page({ params }: { params: Promise<{ id: string, slug: string }> }) {
  const collection = (await params).slug as Collections
  const plantId = (await params).id
  const plant: PlantDocument = await getPlant(plantId, collection)

  console.log(plant)

  return (
    <>
      <PlantDetails plant={ plant } collection={ collection } />
    </>
  );
}
