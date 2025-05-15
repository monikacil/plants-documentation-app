import { getExpensesPages, getExpenses } from "@/app/actions/expenses.actions";
import TableWrapper from "@/app/components/table/TableWrapper";
import { ExpenseDocument } from "@/app/types/expenses.types";
import { SearchParams } from "../types/others.types";
import getPageSearchParams from "../lib/pagesHelper";
import tableConfig from "@/app/tablesConfig/expensesTable.json";
import TableGenerator from "./table/TableGenerator";

export default async function ExpensesPage({ searchParams }: SearchParams) {
  const { query, currentPage, limit, sort } = await getPageSearchParams(searchParams);
  const totalPages = await getExpensesPages(query, limit);
  const expensesList: ExpenseDocument[] = await getExpenses(query, currentPage, limit, sort);

  const expenses = await Promise.all(
    expensesList.map(async (expense: ExpenseDocument) => {
      return { ...expense, date: new Date(expense.date) };
    })
  );

  return (
    <TableWrapper
      title='List of Expenses'
      pages={totalPages}
      link={{ href: `/expenses/add`, text: "Add Expense" }}
    >
      <TableGenerator
        tableConfig={tableConfig}
        data={expenses}
      ></TableGenerator>
    </TableWrapper>
  );
}
