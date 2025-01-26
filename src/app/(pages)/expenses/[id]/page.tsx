import { getExpense } from "@/app/actions/expenses.actions";
import { ExpenseDocument } from "@/app/types/expenses.types";

import ExpenseDetails from "@/app/components/expenses/ExpenseDetails";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const id = (await params).id;
  const expense: ExpenseDocument = await getExpense(id);

  return <ExpenseDetails expense={expense} />;
}
