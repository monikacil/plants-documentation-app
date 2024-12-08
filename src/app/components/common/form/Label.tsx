"use client";

export default function Label({ name }: { name: string}) {
  return (
    <label htmlFor={ name } className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ name }</label>
  )
}