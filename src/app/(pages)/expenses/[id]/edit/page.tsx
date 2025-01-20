import ExpensesPage from "@/app/components/ExpensesPage";

type Props = {
  params: Promise<{ slug: string }>,
  searchParams?: Promise<{
    query?: string;
    page?: string;
    sortBy?: string;
    order?: string
  }>
}

export default async function Page({ searchParams }: Props) {
  return <ExpensesPage searchParams={searchParams} />
}
