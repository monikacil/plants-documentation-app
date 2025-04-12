import { addPlantProtection } from "@/actions/plantProtection.actions";
import ModalWrapper from "@/components/modal/ModalWrapper";
import PlantProtectionForm from "@/components/plantProtection/PlantProtectionForm";

export default function InterceptedPage() {
  return (
    <ModalWrapper title='Add Plant Protection'>
      <PlantProtectionForm action={addPlantProtection} />
    </ModalWrapper>
  );
}
