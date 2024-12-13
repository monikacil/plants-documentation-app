"use client";

import { Pagination } from "flowbite-react";
import { useState } from "react";

export function BasicPagination() {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="my-4 flex overflow-x-auto sm:justify-center">
      <Pagination layout="table" currentPage={currentPage} totalPages={10} onPageChange={onPageChange} showIcons />
    </div>
  );
}
