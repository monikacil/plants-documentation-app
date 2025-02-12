"use client";

import Link from "next/link";

import Button from "../common/Button";
import Search from "../common/Search";
import Pagination from "../common/Pagination";

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
            <Button>{link.text}</Button>
          </Link>
        ) : null}
      </nav>
      {children}
      {pages > 1 ? <Pagination totalPages={pages} /> : null}
    </section>
  );
}
