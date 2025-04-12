import { addPlantProtection } from "@/actions/plantProtection.actions";
import ModalWrapper from "@/components/modal/ModalWrapper";
import PlantProtectionForm from "@/components/plantProtection/PlantProtectionForm";

export default function ParallelRoutePage() {
  return (
    <ModalWrapper
      title='Add Plant Protection'
      route='/plant-protection'
    >
      <PlantProtectionForm action={addPlantProtection} />
    </ModalWrapper>
  );
}
