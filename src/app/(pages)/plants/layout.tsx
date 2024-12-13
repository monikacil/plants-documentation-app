'use client'

import Breadcrumbs from "@/app/components/common/Breadcrumbs"
import { getBreadcrumbsLinks } from "@/app/helpers/getBreadcrumbsLinks";
import { usePathname } from "next/navigation";

export default function PlantsLayout({
  children,
}: {
  children: React.ReactNode
  }) {

  const url = usePathname()
  return (
    <section>
      <Breadcrumbs links={getBreadcrumbsLinks(url)} />
      <article>
        {children}
      </article>
    </section>
  )
}
