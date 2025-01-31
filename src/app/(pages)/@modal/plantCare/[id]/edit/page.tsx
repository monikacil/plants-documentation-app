import { getPlantCare } from "@/app/actions/plantCare.actions";
import ModalWrapper from "@/app/components/modal/ModalWrapper";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function InterceptedPage({ params }: Props) {
  const id = (await params).id;
  const care = await getPlantCare(id);

  return (
    <ModalWrapper title="Edit Plant Care" route="/plantCare">
      edit
      {/* <ExpenseForm expense={expense} /> */}
    </ModalWrapper>
  );
}
