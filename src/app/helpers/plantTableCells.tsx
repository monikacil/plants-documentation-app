'use client'

import { Table } from "flowbite-react";
import { redirect } from "next/navigation";

import { deletePlant, editPlant } from "@/app/actions/plant.actions"
import { Collections, Plant } from "@/app/types/plantTypes"
import PlantModal from "../components/plants/PlantModal";
import BasicButton from "../components/common/BasicButton";

function tableHeadersList(data: Plant[], notAllowedHeaders: string[]) {
  const headers = Object.keys(data[0]).filter(key => !notAllowedHeaders.includes(key))
  return headers
}

function goToDetails(id: string, collection: Collections) { redirect(`/plants/${collection}/${id}`) }

export function getTableHeaders(data: Plant[], notAllowedHeaders: string[]) {
  const headers = tableHeadersList(data, notAllowedHeaders).map((header, idx) => {
    return <Table.HeadCell key={'table-header-' + idx} className="max-w-[280px] bg-teal-900 text-white">
      {header}
    </Table.HeadCell>
  })
  return headers
}

export function getTableBody(data: Plant[], collection: Collections) {
  const tableBody = data.map((plant, idx) =>
    <Table.Row key={'table-body-row-' + idx} className="cursor-pointer border-teal-800/30">
      <Table.Cell onClick={ () => goToDetails(plant._id, collection) }>
        {idx + 1}
      </Table.Cell>
      {Object.entries(plant).filter(([key]) => key !== 'images' && key !== '_id').map((el, idx) => {
        return <Table.Cell key={'table-cell-' + el[0] + '-' + idx} className="max-w-[280px]" onClick={ () => goToDetails(plant._id, collection) }>
          { el[1] as string }
        </Table.Cell>;
      })}
      <Table.Cell className="w-44">
        <div className="flex gap-2">
          <PlantModal plant={ plant } collection={ collection } btnText="Edit" title="Edit Plant" color="teal" plantAction={ editPlant } />
          <BasicButton color="red" onClick={() => { deletePlant(collection, plant._id) }}>Delete</BasicButton>
        </div>
      </Table.Cell>
    </Table.Row>
  )
  return tableBody
}
