'use client'
function getTableHeaders(data: Plant[]) {
  const headers = Object.keys(data[0]).filter(key => key !== 'images')
  headers.push('actions')
  return headers
}

interface Plant {
  species: string,
  variety: string,
  images?: []
}

export default function PlantTable({ data }: { data: Plant[] }) {
  const tableHeaders = getTableHeaders(data).map((header, idx) =>
    <th key={'table-header-'+idx} scope="col" className="px-6 py-3">
      {header}
    </th>
  )

  const tableBody = data.map((plant, idx) =>
    <tr key={'table-body-row-' + idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="w-4 p-4">
        {idx + 1}
      </td>
       {Object.values(plant).map(function(el, idx){
          return <td key={'table-cell-' + el + '-' + idx} className="px-6 py-4">
            { el }
          </td>;
        })}
      <td className="w-6 p-4">
        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3">Edit</a>
        <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
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
