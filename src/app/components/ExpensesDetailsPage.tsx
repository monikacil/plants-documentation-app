import { getExpense } from "../actions/expenses.actions";
import { ExpenseDocument } from "../types/expenses.types";

import ExpenseDetails from "./expenses/ExpenseDetails";

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const id = (await params).id
  const expense: ExpenseDocument = await getExpense(id)

  return (
    <>
      <ExpenseDetails expense={ expense } />
    </>
  );
}
