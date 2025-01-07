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
        <Table className="static" hoverable>
        { tableSubHeaders ? (
            <Table.Head className="tracking-widest">
              {tableSubHeaders}
            </Table.Head>
          ): null }
          <Table.Head className="tracking-widest">
            {tableHeaders}
          </Table.Head>
          <Table.Body className="divide-y text-gray-800">
            {tableBody}
          </Table.Body>
        </Table>
      </div>
    </>
  )
}