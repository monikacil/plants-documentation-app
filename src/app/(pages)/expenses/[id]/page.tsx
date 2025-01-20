import { getExpense } from "@/app/actions/expenses.actions";
import { ExpenseDocument } from "@/app/types/expenses.types";

import ExpenseDetails from "@/app/components/expenses/ExpenseDetails";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
   const id = (await params).id
  const expense: ExpenseDocument = await getExpense(id)

  return (
    <ExpenseDetails expense={ expense } />
  );
}
