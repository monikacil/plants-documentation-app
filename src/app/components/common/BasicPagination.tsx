"use client";

import { Pagination } from "flowbite-react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function BasicPagination({ totalPages }: { totalPages: number }) {
  // const [currentPage, setCurrentPage] = useState(1);

  const pathname = usePathname();
  const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

  const { replace } = useRouter();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    replace(`${ pathname }?${ params.toString() }`);
  };

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination currentPage={ currentPage } totalPages={ totalPages } onPageChange={ (page: number) => createPageURL(page) } showIcons />
    </div>
  );
}
