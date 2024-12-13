'use client'

import { Table } from "flowbite-react";

import { Collections, Plant } from "@/app/types/plantTypes"
import { getTableBody, getTableHeaders } from "@/app/helpers/plantTableCells";
import { BasicPagination } from "../common/BasicPagination";
import Search from "../common/Search";
import { searchPlants } from "@/app/actions/plant.actions";
import { useEffect, useState } from "react";

export default function PlantTable({ data, collection }: { data: Plant[], collection: Collections }) {
  const [plantsList, setPlantsList] = useState(data)

  useEffect(()=> { setPlantsList(data)}, [data])

  const handleChange = async (text: string) => {
    if (text) {
      const plants = await searchPlants(collection, text)
      setPlantsList(plants)
    } else {
      setPlantsList(data)
    }
  }

  // TODO: will be configurable
  const notAllowedHeaders = ["_id", "images"]

  return (
    <>
       {data.length ? (
        <>
        <header>
          <Search onChange={ handleChange}  />
        </header>
          <div className="overflow-x-auto">
          <Table className="static">
            <Table.Head className="tracking-widest">
              <Table.HeadCell className="w-20 bg-teal-900 text-white">No.</Table.HeadCell>
              {getTableHeaders(plantsList, notAllowedHeaders)}
              <Table.HeadCell className="bg-teal-900 text-white">Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y text-gray-800">
              {plantsList ? getTableBody(plantsList, collection) : <p>No data</p>}
            </Table.Body>
          </Table>
          <BasicPagination />
        </div>
        </>
      ) : (
        (<p>No data</p>)
      )}
    </>
  )
}
