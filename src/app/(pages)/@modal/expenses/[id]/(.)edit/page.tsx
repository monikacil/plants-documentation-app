import { editExpense, getExpense } from "@/actions/expenses.actions";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import ModalWrapper from "@/components/modal/ModalWrapper";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function InterceptedPage({ params }: Props) {
  const id = (await params).id;
  const expense = await getExpense(id);

  return (
    <ModalWrapper title="Edit expense">
      <ExpenseForm expense={expense} action={editExpense} />
    </ModalWrapper>
  );
}
