import { getExpense } from "@/app/actions/expenses.actions"
import ExpenseForm from "@/app/components/expenses/ExpenseForm"
import ModalWrapper from "@/app/components/modal/ModalWrapper"

export default async function InterceptedPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const expense = await getExpense(id)

   return (
      <ModalWrapper title="Add expense">
        <ExpenseForm expense={ expense } />
      </ModalWrapper>
    )
}
