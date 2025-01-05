"use client";

import { HiMiniChevronUpDown } from "react-icons/hi2"
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from "react";

export default function Sort({ name }: { name: string }) {
  const [order, setOrder] = useState("asc")
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSort = () => {
    const params = new URLSearchParams(searchParams);
    setOrder(order === "asc" ? "desc" : "asc")
    params.set('sortBy', name);
    params.set('order', order );
    replace(`${pathname}?${params.toString()}`);
  }

  return (
      <HiMiniChevronUpDown className="text-xl cursor-pointer" onClick={ handleSort} />
  )
}
