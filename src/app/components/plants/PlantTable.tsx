'use client'

import { Collections, PlantTableType } from "@/app/types/plant.types"
import BasicTable from "../common/BasicTable";
import { getTableBody, getTableHeaders, getTableSubHeaders } from "./../table/creator";

import headersConfig from "@/app/tablesConfig/plantsTable.json"
import { getHeadersForBody } from "@/app/components/table/creator";
import { usePathname } from "next/navigation";

type Props = {
  plantsList: PlantTableType[],
  collection: Collections
}

export default function PlantTable({ plantsList, collection }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const collectionHeadersList = (list: any) => {
    return list.filter((el: object) => {
      const collectionType = Object.keys(el)[0] === collection ? Object.keys(el)[0] : ''
      if (!collectionType) return
      return el
    })
  }

  const headers = collectionHeadersList(headersConfig)[0][collection]
  const tableHeaders = getTableHeaders(headers)
  let tableSubHeaders;
  if (Array.isArray(headers)) {
    tableSubHeaders = getTableSubHeaders(headers)
  }

  const headersList = getHeadersForBody(headers)

  const collectionUrl = usePathname()

  const tableBody = getTableBody(plantsList, collectionUrl, headersList)

  return (
    <>
      {plantsList.length ? (
        <BasicTable
          tableBody={tableBody}
          tableHeaders={tableHeaders}
          tableSubHeaders={tableSubHeaders}
        />
      ) :
        <p>No data</p>
      }
    </>
  )
}
