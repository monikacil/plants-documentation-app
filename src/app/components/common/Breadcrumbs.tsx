"use client";

import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

type Link = {
  name: string,
  href?: string | undefined,
}

export default function Breadcrumbs({ links }: { links: Link[] }) {
  return (
    <Breadcrumb className="py-3 mb-5">
      {links.map((el, idx) => {
        return <Breadcrumb.Item key={ 'breadcrumb-to-' + el.name } href={ el.href ?? el.href } icon={ idx === 0 ? HiHome : undefined }>
         { el.name }
        </Breadcrumb.Item>
      })}
      </Breadcrumb>
  )
}
