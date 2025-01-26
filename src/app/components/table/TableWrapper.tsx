"use client";

import Link from "next/link";
import { Suspense } from "react";

import BasicButton from "../common/BasicButton";
import Search from "../common/Search";
import BasicPagination from "../common/BasicPagination";
import TableSceleton from "../skeletons/TableSceleton";

type Props = {
  children: React.ReactNode;
  pages: number;
  link?: {
    href: string;
    text: string;
  };
};

export default function TableWrapper({ children, pages, link }: Props) {
  return (
    <section className="bg-white py-4 md:py-5">
      <nav className="flex justify-between mb-3">
        <Search placeholder="Search..." />
        {link ? (
          <Link href={link.href} scroll={false}>
            <BasicButton size="md">{link.text}</BasicButton>
          </Link>
        ) : null}
      </nav>
      <Suspense fallback={<TableSceleton />}>{children}</Suspense>
      {pages > 1 ? <BasicPagination totalPages={pages} /> : null}
    </section>
  );
}
