"use client";

import { Datepicker, Label } from 'flowbite-react';
import ZodErrors from "../common/ZodErrors";

interface Props {
  name: string,
  label: string,
  maxDate?: Date,
  minDate?: Date,
  defaultValue?: Date | undefined,
  value?: Date | null | undefined,
  disabled?: boolean,
  errors?: [],
  className?: string,
  onChange?: (date: Date | null) => void | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

export default function FormDatepicker({ name, label, maxDate, minDate, value, disabled = false, errors, className, onChange }: Props) {
  return (
    <div>
      <Label
        htmlFor={name}
        value={label}
      />
      <Datepicker
        id="datepicker"
        name={name}
        value={value}
        disabled={disabled}
        maxDate={maxDate}
        minDate={minDate}
        className={className}
        onChange={(date: Date | null) => onChange ? onChange(date) : null}
      />
      {errors ? <ZodErrors error={errors} /> : ''}
    </div>
  )
}
