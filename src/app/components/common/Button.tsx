"use client";

import { cn } from "@/app/lib/utils/others";
import { ComponentPropsWithoutRef, ReactNode } from "react";

const colors = {
  primary: "bg-primary-500 hover:bg-primary-600 text-white",
  warning: "bg-warning-500 hover:bg-warning-600 text-white",
  danger: "bg-danger-500 hover:bg-danger-600 text-white",
  info: "bg-info-500 hover:bg-info-600 text-white",
} as const;

const sizes = {
  s: "px-3 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm",
  m: "px-4 py-2 text-sm sm:px-5 sm:py-2 sm:text-base",
  l: "px-5 py-2.5 text-base sm:px-7 sm:py-3 sm:text-md",
  xl: "px-6 py-3 text-md sm:px-9 sm:py-4 sm:text-lg",
} as const;

type ButtonProps = {
  size?: keyof typeof sizes;
  color?: keyof typeof colors;
  isLoading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
} & ComponentPropsWithoutRef<"button">;

export default function Button({
                                 size = "m",
                                 color = "primary",
                                 isLoading = false,
                                 icon,
                                 iconRight,
                                 children,
                                 className,
                                 fullWidth = true,
                                 disabled,
                                 ...rest
                               }: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type="button"
      disabled={ isDisabled }
      className={ cn(
        "inline-flex items-center justify-center gap-2 rounded-full cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-wait",
        fullWidth ? "w-full" : "w-fit",
        colors[ color ],
        sizes[ size ],
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
