"use client";

import { redirect } from "next/navigation";
import { Table } from "flowbite-react";
import Sort from "@/components/common/Sort";
import { generateUniqKey } from "@/lib/utils/others";
import ActionButtons from "./ActionButtons";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableConfig: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
};

export default function TableGenerator({ tableConfig, data }: Props) {
  function goToDetails(url: string, id: string) {
    redirect(`${url}/${id}`);
  }

  const headers = tableConfig.headers;
  const url: string = tableConfig.url || "";

  const renderHeaders = () => {
    return headers.map(
      (header: { title: string; width: string; sortable?: boolean; dbName?: string }) => (
        <Table.HeadCell
          key={generateUniqKey("table-header")}
          className={`w-[${header.width}] bg-base-gray-800 text-white`}
        >
          <div className='flex items-center'>
            {header.title}
            {header.sortable ? <Sort name={header.dbName || ""} /> : null}
          </div>
        </Table.HeadCell>
      )
    );
  };

  const renderBody = () => {
    return data.map((element, idx) => (
      <Table.Row
        key={generateUniqKey("table-body-row")}
        className='cursor-pointer border-teal-800/30'
      >
        {headers.map(
          (header: { title: string; width: string; sortable?: boolean; dbName?: string }) => {
            if (header.dbName === "index") {
              return <Table.Cell key={generateUniqKey("table-cell")}>{idx + 1}</Table.Cell>;
            }

            if (header.dbName === "actions") {
              return (
                <Table.Cell
                  key={generateUniqKey("table-cell")}
                  className='w-32'
                >
                  <ActionButtons route={`${url}/${element._id}`} />
                </Table.Cell>
              );
            }

            const value = header.dbName ? element[header.dbName] : undefined;
            return (
              <Table.Cell
                key={generateUniqKey("table-cell")}
                className='max-w-[280px]'
                onClick={() => {
                  if (url) goToDetails(url, element._id);
                }}
              >
                {value instanceof Date ? value.toLocaleDateString() : value.toString()}
              </Table.Cell>
            );
          }
        )}
      </Table.Row>
    ));
  };

  return (
    <Table>
      <Table.Head>{renderHeaders()}</Table.Head>
      <Table.Body>{renderBody()}</Table.Body>
    </Table>
  );
}
