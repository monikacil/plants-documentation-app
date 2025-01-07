'use client'

import BasicTable from "../common/BasicTable";
import { getTableBody, getTableHeaders, getTableSubHeaders } from "./creator";

import { getHeadersForBody } from "@/app/components/table/creator";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  elementsList: object[],
}

export default function Table({ elementsList }: Props) {
  const [headersConfig, setHeadersConfig] = useState([])

  const url = usePathname()

  const pathName = url.split('/')[1]
  const subHeaderConfig = url.split("/")[2]

  useEffect(() => {
    (async () => {
      const config = await import(`@/app/tablesConfig/${pathName}Table`).then((data) => {return data.default})
      if(config[0].title) {
        setHeadersConfig(config)
      } else {
        setHeadersConfig(headersByType(config)[0][subHeaderConfig])
      }
    })()
  }, [pathName])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const headersByType = (list: any[]) => {
    return list.filter((el: object) => {
      const type = Object.keys(el)[0] === subHeaderConfig ? Object.keys(el)[0] : ''
      if (!type) return
      return el
    })
  }

  // const headers = headersByType(headersConfig)[0][collection]

  const headersList = getHeadersForBody(headersConfig)
  const tableBody = getTableBody(elementsList, url, headersList)
  return (
    <>
      {elementsList.length ? (
        <BasicTable
          tableBody={tableBody}
          tableHeaders={getTableHeaders(headersConfig)}
          tableSubHeaders={getTableSubHeaders(headersConfig)}
        />
      ) :
        <p>No data</p>
      }
    </>
  )
}
