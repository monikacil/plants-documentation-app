"use client";

import { cn } from "@/app/lib/utils/others";
import { ComponentPropsWithoutRef, ReactNode } from "react";

const sizeClasses = {
  s: "text-xs sm:text-sm py-1 px-3 sm:px-4",
  m: "text-sm sm:text-base py-2 px-4 sm:px-5",
  l: "text-base sm:text-md py-2.5 px-5 sm:px-7",
  xl: "text-md sm:text-lg py-3 px-6 sm:px-9",
} as const;

const variantClasses = {
  primary: "btn-primary",
  outline: "btn-outline",
  danger: "btn-danger",
  edit: "btn-edit",
} as const;

type ButtonProps = {
  size?: keyof typeof sizeClasses;
  variant?: keyof typeof variantClasses;
  isLoading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
} & ComponentPropsWithoutRef<"button">;

export default function Button({
                                 size = "m",
                                 variant = "primary",
                                 isLoading = false,
                                 icon,
                                 iconRight,
                                 children,
                                 fullWidth = true,
                                 className,
                                 disabled,
                                 ...rest
                               }: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type="button"
      disabled={ isDisabled }
      className={ cn(
        "inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-wait",
        variantClasses[ variant ],
        sizeClasses[ size ],
        fullWidth ? "w-full" : "w-fit",
        className
      ) }
      { ...rest }
    >
      { isLoading ? (
        <span className="animate-spin h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent rounded-full"/>
      ) : (
        <>
          { icon && <span className="inline-flex items-center">{ icon }</span> }
          <span className="whitespace-nowrap">{ children }</span>
          { iconRight && <span className="inline-flex items-center">{ iconRight }</span> }
        </>
      ) }
    </button>
  );
}
