"use client";

import { InputHTMLAttributes, useEffect, useState } from "react";

import ZodErrors from "./../common/ZodErrors";

import { cn } from "@/lib/utils/others";
import type { ZodError } from "zod";

type Props = {
  value?: string | number;
  label?: string;
  className?: string;
  errors?: ZodError[] | string[];
  onChange: (e: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

export default function Input({ value, label, className, onChange, errors, ...rest }: Props) {
  const [showError, setShowError] = useState(errors ? true : false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (errors) {
      setShowError(true);
    }
  }, [errors]);

  useEffect(() => {
    setInputValue(() => value);
    if (inputValue !== value) {
      setShowError(false);
    }
  }, [value, inputValue]);

  return (
    <div className='flex flex-col gap-1'>
      {label ?? <label>{label}</label>}
      <input
        data-testid='input'
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.currentTarget.value);
        }}
        {...rest}
        className={cn(
          `w-full rounded-full border-0 py-2 px-4 placeholder:text-gray-400 focus-visible:border-none focus-visible:ring-inset focus-visible:outline-base-green-500 focus:ring-2 focus:ring-inset focus:ring-base-green-500 sm:text-sm ${
            showError ?? "bg-red-100 border border-danger-500"
          }`,
          className
        )}
      />
      <div data-testid='zod-error'>
        {showError && errors
          ? errors.map((error, index) => {
              return (
                <ZodErrors
                  error={error as ZodError}
                  className='text-center'
                  key={index}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
}
