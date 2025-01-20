import ExpensesPage from "@/app/components/ExpensesPage";

type Props = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    sortBy?: string;
    order?: string
  }>
}

export default async function Page({ searchParams }: Props) {
  return (
    <ExpensesPage searchParams={ searchParams } />
  );
}
