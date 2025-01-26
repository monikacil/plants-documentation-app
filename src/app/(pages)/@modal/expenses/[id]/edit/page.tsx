import { getExpense } from "@/app/actions/expenses.actions";
import ExpenseForm from "@/app/components/expenses/ExpenseForm";
import ModalWrapper from "@/app/components/modal/ModalWrapper";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function InterceptedPage({ params }: Props) {
  const id = (await params).id;
  const expense = await getExpense(id);

  return (
    <ModalWrapper title="Add expense" route="/expenses">
      <ExpenseForm expense={expense} />
    </ModalWrapper>
  );
}
