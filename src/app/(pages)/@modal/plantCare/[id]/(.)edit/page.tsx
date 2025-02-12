import { editPlantCare, getPlantCare } from "@/actions/plantCare.actions";
import ModalWrapper from "@/components/modal/ModalWrapper";
import PlantCareForm from "@/components/plantCare/PlantCareForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function InterceptedPage({ params }: Props) {
  const id = (await params).id;
  const care = await getPlantCare(id);

  return (
    <ModalWrapper title="Edit Plant Care">
      <PlantCareForm plantCare={care} action={editPlantCare} />
    </ModalWrapper>
  );
}
