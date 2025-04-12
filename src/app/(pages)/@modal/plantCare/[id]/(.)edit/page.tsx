import { editPlantProtection, getPlantProtection } from "@/actions/plantProtection.actions";
import ModalWrapper from "@/components/modal/ModalWrapper";
import PlantProtectionForm from "@/components/plantProtection/PlantProtectionForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function InterceptedPage({ params }: Props) {
  const id = (await params).id;
  const Protection = await getPlantProtection(id);

  return (
    <ModalWrapper title='Edit Plant Protection'>
      <PlantProtectionForm
        plantProtection={Protection}
        action={editPlantProtection}
      />
    </ModalWrapper>
  );
}
