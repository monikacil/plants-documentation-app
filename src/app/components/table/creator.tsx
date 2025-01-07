"use client"

import { Table } from "flowbite-react"

import Sort from "../common/Sort"
import { TableHeaderType } from "@/app/types/others.types"
import { redirect } from "next/navigation"
import Link from "next/link"
import BasicButton from "../common/BasicButton"

function goToDetails(url: string, id: string) { redirect(`${url}/${id}`) }

export const getHeadersForBody = (headers: TableHeaderType[]) => {
  let arr: TableHeaderType[] = [];
  headers.forEach((el: TableHeaderType | TableHeaderType[]) => {
    if (Array.isArray(Object.values(el)[0])) {
      arr = arr.concat(Object.values(el)[0])
    } else {
      arr = arr.concat(el)
    }
  })
  const table = arr.filter((el) => {
    if (el.dbName || el.deletable || el.editable) return el
  }).map((el) => {
    return el.dbName || el.title.toLowerCase()
  })

  return table
}


export function getTableSubHeaders(tableHeaders: TableHeaderType[]) {
  const headers = tableHeaders?.map((header: TableHeaderType) => {
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

export function getTableHeaders(tableHeaders: TableHeaderType[]) {
  // console.log(tableHeaders)
  const subHeaders = tableHeaders?.map((header: TableHeaderType) => {
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
        return subHeader[1].map((subEl: TableHeaderType) => {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTableBody(data: any[], url: string, headers: (string | undefined)[]) {
  if (!data || !headers) return
  const tableBody = data.map((element, idx) =>
    <Table.Row key={'table-body-row-' + idx} className="cursor-pointer border-teal-800/30">
      <Table.Cell onClick={ () => { if(url) goToDetails(url, element._id)} }>
        {idx + 1}
      </Table.Cell>
      {Object.entries(element).filter(([key]) => headers.includes(key)).map((hEl, idx) => {
        return <Table.Cell key={'table-cell-' + hEl[0] + '-' + idx} className="max-w-[280px]" onClick={ () => { if(url) goToDetails(url, element._id)} }>
          { hEl[1] as string }
        </Table.Cell>;
      })}
      { headers.includes("actions") ? (
      <Table.Cell className="w-44">
        <div className="flex gap-2">
          <Link href={`url${element._id}/edit`} scroll={false}><BasicButton color="teal">Edit</BasicButton></Link>
          <Link href={`url${element._id}/delete`} scroll={false}><BasicButton color="red">Delete</BasicButton></Link>
        </div>
      </Table.Cell>
      ): null}
    </Table.Row>
  )
  return tableBody
}
