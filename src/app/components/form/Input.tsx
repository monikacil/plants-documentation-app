"use client";

import { InputHTMLAttributes, useEffect, useState } from "react";

import ZodErrors from "../common/ZodErrors";

import { cn } from "@/app/lib/utils/others";

type Props = {
  value: string | number | undefined;
  className?: string | undefined;
  errors?: string[];
  onChange: (e: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

export default function Input({ value, className, onChange, errors, ...rest }: Props) {
  const [showError, setShowError] = useState(false);
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
      <input
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.currentTarget.value as string)
        }
        {...rest}
        className={cn(
          "w-full rounded-full border-0 py-1.5 px-2  placeholder:text-gray-400 focus-visible:border-none focus-visible:ring-inset focus-visible:outline-base-green-500 focus:ring-2 focus:ring-inset focus:ring-base-green-500 sm:text-sm",
          className,
          showError ? "bg-red-100 border border-danger-500" : ""
        )}
      />
      {showError ? <ZodErrors error={errors} className='text-center' /> : ""}
    </div>
  );
}
