"use client";

import { HiMiniChevronUpDown } from "react-icons/hi2"
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Sort({ name }: { name: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSort = () => {
    const params = new URLSearchParams(searchParams);
    const order = params.get("order")
    params.set("sortBy", name);
    if (!order) {
      params.set("order", "asc");
    } else {
      params.set("order", order === "asc" ? "desc" : "asc");
    }
    replace(`${ pathname }?${ params.toString() }`);
  }

  return (
      <HiMiniChevronUpDown className="text-2xl cursor-pointer hover:text-base-green-300" onClick={ handleSort } />
  )
}
