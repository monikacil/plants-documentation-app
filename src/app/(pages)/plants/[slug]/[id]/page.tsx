import { getPlant } from "@/app/actions/plant.actions";
import { Collections, Plant } from "@/app/types/plantTypes";

export default async function Page({ params }: { params: Promise<{ id: string, slug: string }> }) {
  const slug = (await params).slug as Collections
  const plantId = (await params).id
  const data: Plant = await getPlant(plantId, slug)
  console.log(data)
  return (
    <>
      Plant details
    </>
  );
}
