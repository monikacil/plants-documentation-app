"use client";

import BasicTable from "../common/BasicTable";
import { getTableBody, getTableHeaders } from "./creator";

import { getHeadersForBody } from "@/components/table/creator";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import TableSceleton from "../skeletons/TableSceleton";

type Props = {
  elementsList: object[];
};

export default function Table({ elementsList }: Props) {
  const [headersConfig, setHeadersConfig] = useState([]);

  const url = usePathname();

  const pathName = url.split("/")[1];
  const subHeaderConfig = url.split("/")[2];

  useEffect(() => {
    (async () => {
      const config = await import(`@/tablesConfig/${pathName}Table`).then(
        (data) => {
          return data.default;
        }
      );
      if (config[0].title) {
        setHeadersConfig(config);
      } else {
        setHeadersConfig(headersByType(config)[0][subHeaderConfig]);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const headersByType = (list: any[]) => {
    return list.filter((el: object) => {
      const type =
        Object.keys(el)[0] === subHeaderConfig ? Object.keys(el)[0] : "";
      if (!type) return;
      return el;
    });
  };

  const headersList = getHeadersForBody(headersConfig);
  const tableBody = getTableBody(elementsList, url, headersList);
  const tableHeaders = getTableHeaders(headersConfig);
  return (
    <>
      {elementsList.length ? (
        <Suspense fallback={<TableSceleton />}>
          <BasicTable tableBody={tableBody} tableHeaders={tableHeaders} />
        </Suspense>
      ) : (
        <p>No data</p>
      )}
    </>
  );
}
