"use client";

import { ChangeEvent, useEffect, useState } from "react";

import ZodErrors from "../common/ZodErrors";

import { cn } from "@/app/lib/utils";

type Props = {
  name: string,
  label?: string | undefined,
  type?: "text" | "number" | "date",
  defaultValue?: number | string | undefined,
  value?: number | string | undefined,
  minLength?: number | undefined,
  maxDate?: Date | undefined,
  minDate?: Date | undefined,
  required?: boolean,
  disabled?: boolean,
  readOnly?: boolean,
  placeholder?: string | undefined,
  className?: string | undefined,
  errors?: string[]
  onChange?: (e: string) => void | undefined,
}

export default function Input({ name, type="text", defaultValue, value, minLength, required=false, disabled = false, readOnly=false, placeholder, className, errors, onChange }: Props) {
  const [showError, setShowError] = useState(false)
  const [inputValue, setInputValue] = useState(value)

  useEffect(()=> {
    if(errors) {
      setShowError(true)
    }
  }, [errors])

  useEffect(()=> {
    setInputValue(() => value)
    if(inputValue !== value) {
      setShowError(false)
    }
  }, [value, inputValue])

  return (
    <div className="flex flex-col gap-1">
      <input
        name={ name }
        readOnly={ readOnly }
        type={ type }
        placeholder={ placeholder }
        value={ value }
        defaultValue={ defaultValue }
        disabled={ disabled }
        required={ required }
        minLength={ minLength }
        onChange={ (e: ChangeEvent) => onChange ? onChange((e.target as HTMLInputElement).value) : null }
        className={ cn("w-full rounded-full border-0 py-1.5 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-base-green-500 sm:text-sm", className, showError ? "bg-red-100 border border-danger-500": "") }
      />
      { showError ? <ZodErrors error={ errors } className="text-center" />: '' }
    </div>
  )
}
