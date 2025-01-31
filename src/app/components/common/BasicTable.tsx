import { Table } from "flowbite-react";
import { Flowbite } from "flowbite-react";

import type { CustomFlowbiteTheme } from "flowbite-react";

const customTheme: CustomFlowbiteTheme = {
  table: {
    row: {
      hovered: "hover:bg-base-green-100 ",
    },
  },
};

type Props = {
  tableBody: JSX.Element[] | undefined;
  tableHeaders: JSX.Element[] | undefined;
};

export default function BasicTable({ tableHeaders, tableBody }: Props) {
  return (
    <>
      <div className="overflow-x-auto">
        <Flowbite theme={{ theme: customTheme }}>
          <Table className="static" hoverable>
            <Table.Head className="tracking-widest">{tableHeaders}</Table.Head>
            <Table.Body className="divide-y text-base-gray-900">
              {tableBody}
            </Table.Body>
          </Table>
        </Flowbite>
      </div>
    </>
  );
}
