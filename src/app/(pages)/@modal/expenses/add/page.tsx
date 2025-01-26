import ExpenseForm from "@/app/components/expenses/ExpenseForm";
import ModalWrapper from "@/app/components/modal/ModalWrapper";

export default async function ParallelRoutePage() {
  return (
    <ModalWrapper title="Add expense" route="/expenses">
      <ExpenseForm />
    </ModalWrapper>
  );
}
