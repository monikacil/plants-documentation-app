import { addPlant } from "@/actions/plant.actions";
import ModalWrapper from "@/components/modal/ModalWrapper";
import PlantForm from "@/components/plants/PlantForm";
import { Collections } from "@/types/plant.types";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ParallelRoutePage({ params }: Props) {
  const slug = (await params).slug as Collections;

  return (
    <ModalWrapper title="Add Plant" route={`/plants/${slug}`}>
      <PlantForm collection={slug} action={addPlant} />
    </ModalWrapper>
  );
}
