"use client";

import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

import { generateUniqKey } from "@/app/lib/utils/others";

type Link = {
  name: string,
  href?: string | undefined,
}

export default function Breadcrumbs({ links }: { links: Link[] }) {
  return (
    <Breadcrumb className="py-3">
      { links.map((el, idx) => {
        return <Breadcrumb.Item key={ generateUniqKey("breadcrumb") } href={ el.href ?? el.href } icon={ idx === 0 ? HiHome : undefined }>
          { el.name }
        </Breadcrumb.Item>
      })}
      </Breadcrumb>
  )
}
