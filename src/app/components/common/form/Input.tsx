"use client";

import { Label, TextInput } from "flowbite-react";
import ZodErrors from "../ZodErrors";
import { ChangeEvent } from "react";

interface Props {
  name: string,
  label: string,
  type?: string,
  defaultValue?: number | string | undefined,
  value?: number | string | undefined,
  disabled?: boolean,
  placeholder?: string | undefined,
  className?: string | undefined,
  errors?: []
  onChange?: (e: string) => void | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

export default function Input({ name, label, type="text", defaultValue, value, disabled = false, placeholder, className, errors, onChange }: Props) {
  return (
    <div className={`mb-3 ${className}`}>
      <Label
        htmlFor={name}
        value={label}
      />
      <TextInput
        id={name}
        name={name}
        type={type}
        placeholder={placeholder ? placeholder : label}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={(e: ChangeEvent) => onChange ? onChange((e.target as HTMLInputElement).value) : null}
      />
      { errors ? <ZodErrors error={errors} />: '' }
    </div>
  )
}
