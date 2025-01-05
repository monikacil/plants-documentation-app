'use client'

import Link from "next/link";
import { Table } from "flowbite-react";
import { redirect } from "next/navigation";

import { Collections, PlantTableType } from "@/app/types/plant.types"
import BasicButton from "../common/BasicButton";
import Sort from "../common/Sort";

function goToDetails(id: string | undefined, collection: Collections) { redirect(`/plants/${collection}/${id}`) }

type HeaderType = {
  title: string,
  dbName: string,
  sortable: boolean | undefined,
  editable: boolean | undefined,
  deletable: boolean | undefined,
  colSpan: number | undefined,
  width: string | undefined

}

export function getTableHeaders(tableHeaders: HeaderType[]) {
  const headers = tableHeaders?.map((header: HeaderType) => {
    if ('title' in header) {
      return
    } else {
      const table = Object.entries(header)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return table.map((subHeader: any) => {
        return <Table.HeadCell colSpan={6} key={'table-header-details-' } className="bg-teal-900 text-white">
          <div className="flex items-center justify-center">
            {subHeader[0]}
          </div>
        </Table.HeadCell>
      })
    }
  })

  return <>{headers}</>
}

export function getTableSubHeaders(tableHeaders: HeaderType[]) {
 const subHeaders = tableHeaders?.map((header: HeaderType) => {
    if ('title' in header) {
      return <Table.HeadCell key={'table-header-' + header.title} className={`w-[${header.width ? header.width : "280px"}] bg-teal-900 text-white`}>
        <div className="flex items-center">
          {header.title}
          {header.sortable ? (
            <Sort name={header.dbName || ''} />
            ): null
          }
        </div>
      </Table.HeadCell>
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return Object.entries(header).map((subHeader: any) => {
        return subHeader[1].map((subEl: HeaderType) => {
          return <Table.HeadCell key={'table-header-details-'+ subEl.title} className="max-w-[280px] bg-teal-900 text-white">
            <div className="flex items-center justify-center">
              {subEl.title}
              {subEl.sortable ? (
                <Sort name={subEl.dbName || ''} />
                ): null
              }
            </div>
          </Table.HeadCell>
        })
      })
    }
 })

  return <>{subHeaders}</>
}

export function getTableBody(data: PlantTableType[], collection: Collections, headers: (string | undefined)[]) {
  if (!data || !headers) return
  const tableBody = data.map((plant, idx) =>
    <Table.Row key={'table-body-row-' + idx} className="cursor-pointer border-teal-800/30">
      <Table.Cell onClick={ () => goToDetails(plant?._id.toString(), collection) }>
        {idx + 1}
      </Table.Cell>
      {Object.entries(plant).filter(([key]) => headers.includes(key)).map((el, idx) => {
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
