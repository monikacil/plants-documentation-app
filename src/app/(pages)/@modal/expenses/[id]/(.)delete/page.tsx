import ExpenseDeleteModal from "@/app/components/expenses/ExpenseDeleteModal";

export default async function InterceptedPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  return <ExpenseDeleteModal id={id} />;
}
