import { getExpense } from "../actions/expenses.actions";
import { ExpenseDocument } from "../types/expenses.types";

import ExpenseDetails from "./expenses/ExpenseDetails";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const expense: ExpenseDocument = await getExpense(id)

  return (
    <>
      <ExpenseDetails expense={ expense } />
    </>
  );
}
