'use client'

import { Collections, Plant } from "@/app/types/plantTypes"
import BasicTable from "../common/BasicTable";
import { getTableBody, getTableHeaders } from "./PlantTableCells";

type Props = {
  plantsList: Plant[],
  collection: Collections
}

export default function PlantTable({ plantsList, collection }: Props) {

  // TODO: will be configurable
  const notAllowedHeaders = ["_id", "images"]

  return (
    <>
      {plantsList.length ? (
        <BasicTable
          tableBody={getTableBody(plantsList, collection, notAllowedHeaders)}
          tableHeaders={getTableHeaders(plantsList, notAllowedHeaders)}
        />
      ) : (
        (<p>No data</p>)
      )}
    </>
  )
}
