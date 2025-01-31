import { deleteExpense } from "@/app/actions/expenses.actions";
import DeleteElementModal from "@/app/components/modal/DeleteElementModal";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function InterceptedPage({ params }: Props) {
  const id = (await params).id;

  return (
    <DeleteElementModal
      id={id}
      title="Delete Expense"
      action={deleteExpense}
      route="/expenses"
      withRoute
    >
      psddp
    </DeleteElementModal>
  );
}
