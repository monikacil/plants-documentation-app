import { getPlant } from "@/app/actions/plant.actions";
import PlantDetails from "@/app/components/plants/PlantDetails";
import { Collections, PlantDocument } from "@/app/types/plant.types";

type Props = {
  params: Promise<{ id: string; slug: string }>;
};

export default async function Page({ params }: Props) {
  const collection = (await params).slug as Collections;
  const plantId = (await params).id;
  const plant: PlantDocument = await getPlant(plantId, collection);

  return (
    <>
      <PlantDetails plant={plant} collection={collection} />
    </>
  );
}
