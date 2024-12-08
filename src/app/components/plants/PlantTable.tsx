'use client'

import { deletePlant } from "@/app/actions/plant.actions"
import { usePathname } from "next/navigation"
import EditPlantModal from "./EditPlantModal"
import { Collections, Plant } from "@/app/types/plantTypes"

function getTableHeaders(data: Plant[]) {
  const headers = Object.keys(data[0]).filter(key => key !== 'images' && key !== '_id')
  headers.push('actions')
  return headers
}

export default function PlantTable({ data }: { data: Plant[] }) {
  const url = usePathname()
  const collection = url.split('/')[2] as Collections

  const tableHeaders = getTableHeaders(data).map((header, idx) =>
    <th key={'table-header-' + idx} scope="col" className="px-6 py-3">
      {header}
    </th>
  )

  const tableBody = data.map((plant, idx) =>
    <tr key={'table-body-row-' + idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="w-4 p-4">
        {idx + 1}
      </td>
      { Object.entries(plant).filter(([key]) => key !== 'images' && key !== '_id').map( (el, idx) => {
        return <td key={'table-cell-' + el + '-' + idx} className="px-6 py-4">
          { el[1] }
        </td>;
      })}
      <td className="w-6 p-4">
        <EditPlantModal plant={plant}/>
        <button onClick={ () => deletePlant(collection, plant?._id) } className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
      </td>
    </tr>
  )
  return (
    <>
      <div>
       <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                No.
              </th>
              { tableHeaders }
            </tr>
        </thead>
        <tbody>
          { tableBody }
        </tbody>
    </table>
     </div>
    </>
  )
}
