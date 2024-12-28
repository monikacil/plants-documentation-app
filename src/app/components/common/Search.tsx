"use client";

import { IoIosSearch } from "react-icons/io";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { TextInput } from "flowbite-react";
import { useDebouncedCallback } from 'use-debounce';

type Props = {
  placeholder?: string | undefined
}

export default function Search({ placeholder }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="bg-white dark:bg-gray-900">
      <TextInput
        id="table-search"
        type="email"
        sizing="md"
        rightIcon={IoIosSearch}
        placeholder={ placeholder }
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}  />
    </div>
  )
}





