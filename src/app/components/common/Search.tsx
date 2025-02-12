"use client";

import { FiSearch } from "react-icons/fi";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Input from "../form/Input";

type Props = {
  placeholder?: string | undefined;
};

export default function Search({ placeholder }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 end-2 text-xl flex items-center ps-3.5 pointer-events-none text-base-gray-700">
        <FiSearch />
      </div>
      <Input
        placeholder={placeholder}
        defaultValue={searchParams.get("query")?.toString()}
        onChange={handleSearch}
        className="pr-10 pl-5 py-2 bg-white text-gray-900 ring ring-inset ring-base-gray-700 focus-visible:ring-inset focus-visible:outline-base-gray-800 focus:ring-2 focus:ring-inset focus:ring-base-gray-800"
      />
    </div>
  );
}
