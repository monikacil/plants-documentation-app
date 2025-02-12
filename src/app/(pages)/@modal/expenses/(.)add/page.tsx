import { addExpenses } from "@/actions/expenses.actions";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import ModalWrapper from "@/components/modal/ModalWrapper";

export default function InterceptedPage() {
  return (
    <ModalWrapper title="Add expense">
      <ExpenseForm action={addExpenses} />
    </ModalWrapper>
  );
}
