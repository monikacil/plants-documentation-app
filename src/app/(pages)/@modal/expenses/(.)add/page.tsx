import ExpenseForm from "@/app/components/expenses/ExpenseForm"
import ModalWrapper from "@/app/components/modal/ModalWrapper"

export default function InterceptedPage() {
   return (
      <ModalWrapper title="Add expense">
        <ExpenseForm />
      </ModalWrapper>
    )
}
