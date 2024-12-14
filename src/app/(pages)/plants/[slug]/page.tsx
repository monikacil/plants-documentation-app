import { getPlants } from "@/app/actions/plant.actions";
import { Collections, Plant } from "@/app/types/plantTypes";
import PlantsTableWrapper from "@/app/components/plants/PlantsTableWrapper";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const collection = (await params).slug as Collections
  const data: Plant[] = await getPlants(collection)

  return (
    <>
      <PlantsTableWrapper collection={collection} data={data} />
    </>
  );
}
