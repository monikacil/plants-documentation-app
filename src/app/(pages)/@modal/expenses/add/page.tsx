import { addExpenses } from "@/actions/expenses.actions";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import ModalWrapper from "@/components/modal/ModalWrapper";

export default function ParallelRoutePage() {
  return (
    <ModalWrapper title="Add expense" route="/expenses">
      <ExpenseForm action={addExpenses} />
    </ModalWrapper>
  );
}
