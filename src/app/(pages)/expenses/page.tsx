import { getExpenses } from "@/app/actions/expenses.actions";
import ExpensesTable from "@/app/components/expenses/ExpensesTable";
import TableWrapper from "@/app/components/table/TableWrapper";
import { PAGINATION_LIMIT } from "@/app/lib/constants";
import { ExpenseDocument } from "@/app/types/expenses.types";

type Props = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    sortBy?: string;
    order?: string
  }>
}

export default async function Page({ searchParams }: Props) {
    const searchedParams = await searchParams;
    const query = searchedParams?.query || '';
    const currentPage = Number(searchedParams?.page) || 1;
    const limit = PAGINATION_LIMIT;
    const totalPages = 1
    // const totalPages = await fetchExpensesPages(query, limit)
    const sortBy = searchedParams?.sortBy || undefined
    const order = searchedParams?.order || "asc"
    let sort = undefined
    if (sortBy) {
      sort = [{key: sortBy, direction: order}]
    }

    const expensesList: ExpenseDocument[] = await getExpenses(query, currentPage, limit, sort)

  return (
    <TableWrapper query={query} currentPage={currentPage} pages={totalPages} link={{href: `/expenses/add`, text: "Add Expense"}}>
      <ExpensesTable expensesList={expensesList} details={false}></ExpensesTable>
    </TableWrapper>
  );
}
