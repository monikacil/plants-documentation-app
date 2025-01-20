'use client'

import { usePathname } from "next/navigation";

import { getBreadcrumbsLinks } from "@/app/lib/utils/others";
import Breadcrumbs from "@/app/components/common/Breadcrumbs"

export default function Layout({ children }: { children: React.ReactNode}) {
  const url = usePathname()

  return (
    <section>
      <Breadcrumbs links={ getBreadcrumbsLinks(url) } />
      <article>
        { children }
      </article>
    </section>
  )
}
