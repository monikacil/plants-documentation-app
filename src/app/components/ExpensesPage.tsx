import { getExpensesPages, getExpenses } from "@/actions/expenses.actions";
import Table from "@/components/table/Table";
import TableWrapper from "@/components/table/TableWrapper";
import { ExpenseDocument } from "@/types/expenses.types";
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
