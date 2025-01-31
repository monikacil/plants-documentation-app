import { addPlantCare } from "@/app/actions/plantCare.actions";
import ModalWrapper from "@/app/components/modal/ModalWrapper";
import PlantCareForm from "@/app/components/plantCare/PlantCareForm";

export default function ParallelRoutePage() {
  return (
    <ModalWrapper title="Add Plant Care" route="/plantCare">
      <PlantCareForm action={addPlantCare} />
    </ModalWrapper>
  );
}
