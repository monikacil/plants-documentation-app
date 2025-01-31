import { addExpenses } from "@/app/actions/expenses.actions";
import ExpenseForm from "@/app/components/expenses/ExpenseForm";
import ModalWrapper from "@/app/components/modal/ModalWrapper";

export default async function ParallelRoutePage() {
  return (
    <ModalWrapper title="Add expense" route="/expenses">
      <ExpenseForm action={addExpenses} />
    </ModalWrapper>
  );
}
