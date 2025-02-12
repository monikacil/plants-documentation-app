"use client";

import { usePathname } from "next/navigation";

import Breadcrumbs from "@/components/common/Breadcrumbs";
import getBreadcrumbsLinks from "@/lib/utils/breadcrumbs";

export default function Layout({ children }: { children: React.ReactNode }) {
  const url = usePathname();

  return (
    <section>
      <Breadcrumbs links={getBreadcrumbsLinks(url)} />
      <article>{children}</article>
    </section>
  );
}
