import { addExpenses } from "@/app/actions/expenses.actions";
import ExpenseForm from "@/app/components/expenses/ExpenseForm";
import ModalWrapper from "@/app/components/modal/ModalWrapper";

export default function ParallelRoutePage() {
  return (
    <ModalWrapper title="Add expense" route="/expenses">
      <ExpenseForm action={addExpenses} />
    </ModalWrapper>
  );
}
