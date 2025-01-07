"use client"

import Link from "next/link";
import { Suspense } from "react";

import BasicButton from "../common/BasicButton";
import Search from "../common/Search";
import TableSceleton from "../skeletons/TableSceleton";
import BasicPagination from "../common/BasicPagination";

type Props = {
  children: React.ReactNode,
  query: string,
  currentPage: number,
  pages: number,
  link?: {
    href: string,
    text: string
  }

}

export default function TableWrapper({ children, query, currentPage, pages, link }: Props) {
  return (
    <>
      <nav className="flex justify-between mb-3">
        <Search placeholder="Search for plant..." />
        { link ? (
          <Link href={link.href} scroll={false}><BasicButton size="md">{link.text}</BasicButton></Link>
        ): null}
      </nav>
      <Suspense key={query + currentPage} fallback={<TableSceleton />}>
        {children}
      </Suspense>
      { pages > 1 ? <BasicPagination totalPages={ pages } /> : null }
    </>
  );
}
