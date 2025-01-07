import BasicModal from '@/app/components/common/BasicModal'
import ExpenseForm from '@/app/components/expenses/ExpenseForm'

export default async function Page() {

  return (
    <BasicModal title="Add plant">
      <ExpenseForm />
    </BasicModal>
  )
}
