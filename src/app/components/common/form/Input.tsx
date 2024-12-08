"use client";

interface Props {
  name: string,
  defaultValue?: string | undefined,
  disabled?: boolean
}

export default function Input({ name, defaultValue, disabled = false }: Props) {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">{ name }</label>
      <input id={ name } name={ name } type="text" defaultValue={defaultValue} disabled={disabled} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500" />
    </div>
  )
}