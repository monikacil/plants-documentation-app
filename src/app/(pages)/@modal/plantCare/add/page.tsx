import { addPlantCare } from "@/actions/plantCare.actions";
import ModalWrapper from "@/components/modal/ModalWrapper";
import PlantCareForm from "@/components/plantCare/PlantCareForm";

export default function ParallelRoutePage() {
  return (
    <ModalWrapper title="Add Plant Care" route="/plantCare">
      <PlantCareForm action={addPlantCare} />
    </ModalWrapper>
  );
}
