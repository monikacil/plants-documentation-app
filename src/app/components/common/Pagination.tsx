"use client";

import { Pagination as FlowbitePagination } from "flowbite-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  totalPages: number;
};

export default function Pagination({ totalPages }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { replace } = useRouter();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <FlowbitePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => createPageURL(page)}
        showIcons
      />
    </div>
  );
}
