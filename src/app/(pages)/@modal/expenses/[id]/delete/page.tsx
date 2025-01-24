import ExpenseDeleteModal from "@/app/components/expenses/ExpenseDeleteModal";

type Props = {
  params: Promise<{ slug: string; id: string }>;
};

export default async function InterceptedPage({ params }: Props) {
  const id = (await params).id;

  return <ExpenseDeleteModal id={id} withRoute />;
}
