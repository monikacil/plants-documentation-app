'use client'

import Link from "next/link";
import { Table } from "flowbite-react";
import { redirect } from "next/navigation";

import { Collections, PlantTableType } from "@/app/types/plantTypes"
import BasicButton from "../common/BasicButton";
import Sort from "../common/Sort";

function tableHeadersList(data: PlantTableType[], notAllowedHeaders: string[]) {
  const headers = Object.keys(data[0]).filter(key => !notAllowedHeaders.includes(key))
  return headers
}

function goToDetails(id: string | undefined, collection: Collections) { redirect(`/plants/${collection}/${id}`) }

export function getTableHeaders(data: PlantTableType[], notAllowedHeaders: string[]) {
  const headers = tableHeadersList(data, notAllowedHeaders).map((header, idx) => {
    return <Table.HeadCell key={'table-header-' + idx} className="max-w-[280px] bg-teal-900 text-white">
      <div className="flex items-center">
        {header}
        <Sort name={ header } />
      </div>
    </Table.HeadCell>
  })
  return headers
}

export function getTableBody(data: PlantTableType[], collection: Collections, notAllowedHeaders: string[]) {
  if (!data) return
  const tableBody = data.map((plant, idx) =>
    <Table.Row key={'table-body-row-' + idx} className="cursor-pointer border-teal-800/30">
      <Table.Cell onClick={ () => goToDetails(plant?._id.toString(), collection) }>
        {idx + 1}
      </Table.Cell>
      {Object.entries(plant).filter(([key]) => !notAllowedHeaders.includes(key)).map((el, idx) => {
        return <Table.Cell key={'table-cell-' + el[0] + '-' + idx} className="max-w-[280px]" onClick={ () => goToDetails(plant._id, collection) }>
          { el[1] as string }
        </Table.Cell>;
      })}
      <Table.Cell className="w-44">
        <div className="flex gap-2">
          <Link href={`/plants/${collection}/${plant._id}/edit`} scroll={false}><BasicButton color="teal">Edit</BasicButton></Link>
          <Link href={`/plants/${collection}/${plant._id}/delete`} scroll={false}><BasicButton color="red">Delete</BasicButton></Link>
        </div>
      </Table.Cell>
    </Table.Row>
  )
  return tableBody
}
