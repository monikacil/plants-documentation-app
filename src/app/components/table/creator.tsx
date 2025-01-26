"use client";
import { redirect } from "next/navigation";
import { Table } from "flowbite-react";

import Sort from "../common/Sort";
import ActionButtons from "./ActionButtons";

import { TableHeaderType } from "@/app/types/others.types";
import { generateUniqKey } from "@/app/lib/utils/others";

function goToDetails(url: string, id: string) {
  redirect(`${url}/${id}`);
}

export const getHeadersForBody = (headers: TableHeaderType[]) => {
  let arr: TableHeaderType[] = [];
  headers.forEach((el: TableHeaderType | TableHeaderType[]) => {
    if (Array.isArray(Object.values(el)[0])) {
      arr = arr.concat(Object.values(el)[0]);
    } else {
      arr = arr.concat(el);
    }
  });
  const table = arr
    .filter((el) => {
      if (el.dbName || el.deletable || el.editable) return el;
    })
    .map((el) => {
      return el.dbName || el.title.toLowerCase();
    });

  return table;
};

export function getTableHeaders(tableHeaders: TableHeaderType[]) {
  if (!tableHeaders) return;
  const headers = tableHeaders?.map((header: TableHeaderType) => {
    return (
      <Table.HeadCell
        key={generateUniqKey("table-header")}
        className={`w-[${
          header.width ? header.width : "280px"
        }] bg-base-gray-800 text-white`}
      >
        <div className="flex items-center">
          {header.title}
          {header.sortable ? <Sort name={header.dbName || ""} /> : null}
        </div>
      </Table.HeadCell>
    );
  });

  return headers;
}

export function getTableBody(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[],
  url: string,
  headers: (string | undefined)[]
) {
  if (!data || !headers) return;
  const tableBody = data.map((element, idx) => (
    <Table.Row
      key={generateUniqKey("table-body-row")}
      className="cursor-pointer border-teal-800/30"
    >
      <Table.Cell
        onClick={() => {
          if (url) goToDetails(url, element._id);
        }}
      >
        {idx + 1}
      </Table.Cell>
      {Object.entries(element)
        .filter(([key]) => headers.includes(key))
        .map((hEl) => {
          return (
            <Table.Cell
              key={generateUniqKey("table-cell")}
              className="max-w-[280px]"
              onClick={() => {
                if (url) goToDetails(url, element._id);
              }}
            >
              {hEl[1] as string}
            </Table.Cell>
          );
        })}
      {headers.includes("actions") ? (
        <Table.Cell className="w-44">
          <ActionButtons route={`${url}/${element._id}`} />
        </Table.Cell>
      ) : null}
    </Table.Row>
  ));

  return tableBody;
}
