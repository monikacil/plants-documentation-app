"use client";

import { TextInput } from "flowbite-react";
import { ChangeEvent } from "react";
import { IoIosSearch  } from "react-icons/io";
import { useDebouncedCallback } from 'use-debounce';

interface Props {
  onChange: (text: string) => void
}

export default function Search({ onChange }: Props) {

  const debounced = useDebouncedCallback(
    (text) => {
      onChange(text)
    },
    700
  );

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mt-1">
        <TextInput id="table-search" type="email" rightIcon={IoIosSearch } placeholder="Search for plant" onChange={(e: ChangeEvent) => { debounced((e.target as HTMLInputElement).value) } }  />
      </div>
    </div>
  )
}





