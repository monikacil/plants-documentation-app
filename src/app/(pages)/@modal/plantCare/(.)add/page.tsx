import { addPlantCare } from "@/actions/plantCare.actions";
import ModalWrapper from "@/components/modal/ModalWrapper";
import PlantCareForm from "@/components/plantCare/PlantCareForm";

export default function InterceptedPage() {
  return (
    <ModalWrapper title="Add Plant Care">
      <PlantCareForm action={addPlantCare} />
    </ModalWrapper>
  );
}
