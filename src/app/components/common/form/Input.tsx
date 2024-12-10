"use client";

import { FloatingLabel } from "flowbite-react";

interface Props {
  name: string,
  defaultValue?: string | undefined,
  disabled?: boolean
}

export default function Input({ name, defaultValue, disabled = false }: Props) {
  return (
    <div className="mb-5">
      <FloatingLabel id="name" name={name} type="text" variant="filled" defaultValue={defaultValue} disabled={disabled} label={name}></FloatingLabel>
    </div>
  )
}