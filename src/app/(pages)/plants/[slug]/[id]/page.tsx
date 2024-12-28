import { getPlant } from "@/app/actions/plant.actions";
import PlantDetails from "@/app/components/plants/PlantDetails";
import { Collections, Plant } from "@/app/types/plantTypes";

export default async function Page({ params }: { params: Promise<{ id: string, slug: string }> }) {
  const collection = (await params).slug as Collections
  const plantId = (await params).id
  const plant: Plant = await getPlant(plantId, collection)
  return (
    <>
      <PlantDetails plant={ plant } collection={ collection } />
    </>
  );
}
