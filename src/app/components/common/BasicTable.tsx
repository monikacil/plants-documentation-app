"use client";

import { Table } from "flowbite-react";

type Props = {
  tableBody: JSX.Element[] | undefined,
  tableHeaders: JSX.Element | undefined,
  tableSubHeaders?: JSX.Element | undefined
}

export default function BasicTable({ tableHeaders, tableSubHeaders, tableBody }: Props) {
  // console.log(tableSubHeaders)
  return (
    <>
      <div className="overflow-x-auto">
        <Table className="static">
          <Table.Head className="tracking-widest">
            {tableHeaders}
          </Table.Head>
          { tableSubHeaders ? (
            <Table.Head>
              {tableSubHeaders}
            </Table.Head>
          ): null }
          <Table.Body className="divide-y text-gray-800">
            {tableBody}
          </Table.Body>
        </Table>
      </div>
    </>
  )
}