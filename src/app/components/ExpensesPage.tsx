import { getExpensesPages, getExpenses } from "@/app/actions/expenses.actions";
import Table from "@/app/components/table/Table";
import TableWrapper from "@/app/components/table/TableWrapper";
import { ExpenseDocument } from "@/app/types/expenses.types";
import { SearchParams } from "../types/others.types";
import getPageSearchParams from "../lib/pagesHelper";

export default async function ExpensesPage({ searchParams }: SearchParams) {
  const { query, currentPage, limit, sort } = await getPageSearchParams(
    searchParams
  );
  const totalPages = await getExpensesPages(query, limit);
  const expensesList: ExpenseDocument[] = await getExpenses(
    query,
    currentPage,
    limit,
    sort
  );

  return (
    <TableWrapper
      pages={totalPages}
      link={{ href: `/expenses/add`, text: "Add Expense" }}
    >
      <Table elementsList={expensesList}></Table>
    </TableWrapper>
  );
}
