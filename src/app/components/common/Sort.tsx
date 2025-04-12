"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

type Props = {
  name: string;
};

export default function Sort({ name }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [order, setOrder] = useState("asc");

  const handleSort = () => {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", name);

    params.set("order", order === "asc" ? "desc" : "asc");
    setOrder(order === "asc" ? "desc" : "asc");

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {order === "asc" ? (
        <FaCaretDown
          className='text-2xl ml-3 cursor-pointer hover:text-base-gray-500'
          onClick={handleSort}
        />
      ) : (
        <FaCaretUp
          className='text-2xl ml-3 cursor-pointer hover:text-base-gray-500'
          onClick={handleSort}
        />
      )}
    </>
  );
}
