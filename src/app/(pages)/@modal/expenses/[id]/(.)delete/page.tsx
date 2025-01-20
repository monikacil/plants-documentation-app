import { deleteExpense } from "@/app/actions/expenses.actions";

import ConfirmationModal from "@/app/components/common/ConfirmationModal";
import ModalWrapper from "@/app/components/modal/ModalWrapper";

export default async function InterceptedPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id

  async function handleConfirmClick() {
    'use server'
    await deleteExpense(id)
  }

  return (
    <ModalWrapper title="Delete Expense">
      <ConfirmationModal title="Delete Expense" confirmClick={ handleConfirmClick }>
        This action will remove the expense from the list.
      </ConfirmationModal>
    </ModalWrapper>
  )
}
