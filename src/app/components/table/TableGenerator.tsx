"use client";

import { redirect } from "next/navigation";
import { Table } from "flowbite-react";
import Sort from "@/components/common/Sort";
import { generateUniqKey } from "@/lib/utils/others";
import ActionButtons from "./ActionButtons";

// type Props = {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   tableConfig: any;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   data: any[];
// };

// export default function TableGenerator({ tableConfig, data }: Props) {
//   function goToDetails(url: string, id: string) {
//     redirect(`${url}/${id}`);
//   }

//   const headers = tableConfig.headers;
//   const url: string = tableConfig.url || "";

//   const renderHeaders = () => {
//     return headers.map(
//       (header: { title: string; width: string; sortable?: boolean; dbName?: string }) => (
//         <Table.HeadCell
//           key={generateUniqKey("table-header")}
//           className={`w-[${header.width}] bg-base-gray-800 text-white`}
//         >
//           <div className='flex items-center'>
//             {header.title}
//             {header.sortable ? <Sort name={header.dbName || ""} /> : null}
//           </div>
//         </Table.HeadCell>
//       )
//     );
//   };

//   const renderBody = () => {
//     return data.map((element, idx) => (
//       <Table.Row
//         key={generateUniqKey("table-body-row")}
//         className='cursor-pointer hover:bg-base-gray-300'
//       >
//         {headers.map(
//           (header: { title: string; width: string; sortable?: boolean; dbName?: string }) => {
//             if (header.dbName === "index") {
//               return <Table.Cell key={generateUniqKey("table-cell")}>{idx + 1}</Table.Cell>;
//             }

//             if (header.dbName === "actions") {
//               return (
//                 <Table.Cell
//                   key={generateUniqKey("table-cell")}
//                   className='w-32'
//                 >
//                   <ActionButtons route={`${url}/${element._id}`} />
//                 </Table.Cell>
//               );
//             }

//             const value = header.dbName ? element[header.dbName] : undefined;
//             return (
//               <Table.Cell
//                 key={generateUniqKey("table-cell")}
//                 className='max-w-[280px]'
//                 onClick={() => {
//                   if (url) goToDetails(url, element._id);
//                 }}
//               >
//                 {value instanceof Date ? value.toLocaleDateString() : value.toString()}
//               </Table.Cell>
//             );
//           }
//         )}
//       </Table.Row>
//     ));
//   };

//   return (
//     <Table>
//       <Table.Head>{renderHeaders()}</Table.Head>
//       <Table.Body>{renderBody()}</Table.Body>
//     </Table>
//   );
// }

type Props = {
  tableConfig: {
    headers: { title: string; dbName: string; sortable?: boolean; width?: string }[];
    url?: string;
    hasDetails: boolean;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
};

export default function TableGenerator({ tableConfig, data }: Props) {
  const headers = tableConfig.headers;
  const url: string = tableConfig.url || "";

  const goToDetails = (id: string) => {
    window.location.href = `${url}/${id}`;
  };

  const handleClick = (id: string) => {
    if (!tableConfig.hasDetails) {
      return;
    }
    goToDetails(id);
  };

  const renderHeaders = () => {
    return (
      <tr className='text-lg'>
        {headers.map((header) => (
          <th
            key={header.dbName}
            className='px-4 py-2'
          >
            <div className='flex items-centers align-middle font-semibold'>
              {header.title}
              {header.sortable && <Sort name={header.dbName || ""} />}
            </div>
          </th>
        ))}
      </tr>
    );
  };

  const renderBody = () => {
    return data.map((row, idx) => (
      <tr
        key={row._id || idx}
        className={`border-b hover:bg-gray-100 ${
          tableConfig.hasDetails && "cursor-pointer"
        } font-normal`}
      >
        {headers.map((header) => {
          if (header.dbName === "index") {
            return (
              <td
                key={header.dbName}
                className='px-4 py-2 text-base'
                width='80px'
                onClick={() => handleClick(row._id)}
              >
                {idx + 1}
              </td>
            );
          }

          if (header.dbName === "actions") {
            return (
              <td
                key={header.dbName}
                className='px-4 py-2 text-base'
                width='120px'
              >
                <ActionButtons route={`${url}/${row._id}`} />
              </td>
            );
          }

          const value = row[header.dbName];
          return (
            <td
              key={header.dbName}
              className='px-4 py-2 text-base'
              width={header.width ? header.width : ""}
              onClick={() => handleClick(row._id)}
            >
              {value instanceof Date ? value.toLocaleDateString() : value}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div className='rounded-lg shadow-md overflow-hidden'>
      <table className='min-w-full'>
        <thead className='bg-base-green-600 text-white'>{renderHeaders()}</thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
}
