"use client";

import Link from "next/link";

import BasicButton from "../common/BasicButton";
import Search from "../common/Search";
import BasicPagination from "../common/BasicPagination";

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
    <section className="py-4 md:py-5">
      <nav className="flex justify-between mb-3">
        <Search placeholder="Search..." />
        {link ? (
          <Link href={link.href} scroll={false}>
            <BasicButton size="md">{link.text}</BasicButton>
          </Link>
        ) : null}
      </nav>
      {children}
      {pages > 1 ? <BasicPagination totalPages={pages} /> : null}
    </section>
  );
}
