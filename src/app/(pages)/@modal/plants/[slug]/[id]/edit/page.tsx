import { editPlant, getPlant } from "@/actions/plant.actions";
import ModalWrapper from "@/components/modal/ModalWrapper";
import PlantForm from "@/components/plants/PlantForm";
import { Collections, PlantTableType } from "@/types/plant.types";

type Props = {
  params: Promise<{ slug: string; id: string }>;
};

export default async function ParallelRoutePage({ params }: Props) {
  const slug = (await params).slug as Collections;
  const id = (await params).id;
  const plant: PlantTableType = await getPlant(id, slug);

  return (
    <ModalWrapper title="Edit Plant" route={`/plants/${slug}`}>
      <PlantForm plant={plant} collection={slug} action={editPlant} />
    </ModalWrapper>
  );
}
