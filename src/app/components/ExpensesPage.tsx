import { getExpensesPages, getExpenses } from "@/app/actions/expenses.actions";
import Table from "@/app/components/table/Table";
import TableWrapper from "@/app/components/table/TableWrapper";
import { PAGINATION_LIMIT } from "@/app/lib/constants";
import { ExpenseDocument } from "@/app/types/expenses.types";

type Props = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    sortBy?: string;
    order?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const searchedParams = await searchParams;
  const query = searchedParams?.query || "";
  const currentPage = Number(searchedParams?.page) || 1;
  const limit = PAGINATION_LIMIT;
  const totalPages = await getExpensesPages(query, limit);
  const sortBy = searchedParams?.sortBy || undefined;
  const order = searchedParams?.order || "asc";
  let sort = undefined;
  if (sortBy) {
    sort = [{ key: sortBy, direction: order }];
  }

  const expensesList: ExpenseDocument[] = await getExpenses(query, currentPage, limit, sort);

  return (
    <TableWrapper pages={totalPages} link={{ href: `/expenses/add`, text: "Add Expense" }}>
      <Table elementsList={expensesList}></Table>
    </TableWrapper>
  );
}
