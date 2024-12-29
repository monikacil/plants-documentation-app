"use client";

import { Table } from "flowbite-react";

type Props = {
  tableBody: JSX.Element[] | undefined,
  tableHeaders: JSX.Element[] | undefined
}

export default function BasicTable({ tableHeaders, tableBody }: Props) {
  return (
    <>
      <div className="overflow-x-auto">
        <Table className="static">
          <Table.Head className="tracking-widest">
            <Table.HeadCell className="w-20 bg-teal-900 text-white">No.</Table.HeadCell>
            {tableHeaders}
            <Table.HeadCell className="bg-teal-900 text-white">Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y text-gray-800">
            {tableBody}
          </Table.Body>
        </Table>
      </div>
    </>
  )
}