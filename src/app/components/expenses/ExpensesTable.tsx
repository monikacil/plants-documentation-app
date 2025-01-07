'use client'

import BasicTable from "../common/BasicTable";

import headersConfig from "@/app/tablesConfig/expensesTable.json"
import { getHeadersForBody } from "@/app/components/table/creator";
import { ExpenseFormType } from "@/app/types/expenses.types";
import { getTableBody, getTableHeaders } from "../table/creator";
import { TableHeaderType } from "@/app/types/others.types";
import { usePathname } from "next/navigation";

type Props = {
  expensesList: ExpenseFormType[],
  details: boolean
}

export default function ExpensesTable({ expensesList, details=true }: Props) {
  const headers = headersConfig as TableHeaderType[]
  const tableHeaders = getTableHeaders(headers)
  const headersList = getHeadersForBody(headers)
  const path = usePathname()

  const url = details ? path : ''

  const tableBody = getTableBody(expensesList, url, headersList)

  return (
    <>
      {expensesList.length ? (
        <BasicTable
          tableBody={tableBody}
          tableHeaders={tableHeaders}
        />
      ) :
        <p>No data</p>
      }
    </>
  )
}
