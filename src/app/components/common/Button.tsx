"use client";

import { cn } from "@/lib/utils/others";
import { ComponentPropsWithoutRef } from "react";

const colors = {
  primary: "bg-primary-500 hover:bg-primary-600 text-white",
  warning: "bg-warning-500 hover:bg-warning-600 text-white",
  danger: "bg-danger-500 hover:bg-danger-600 text-white",
  info: "bg-info-500 hover:bg-info-600 text-white",
};

const sizes = {
  s: "px-3 py-1 text-sm",
  m: "px-5 py-2 text-base",
  l: "px-7 py-3 text-md",
  xl: "px-9 py-4 text-lg",
};

type Props = ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
  size?: "s" | "m" | "l" | "xl";
  color?: "primary" | "warning" | "danger" | "info";
  type?: "submit" | "button";
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any) => void | Promise<any>;
};

export default function Button({
  children,
  size = "m",
  color = "primary",
  type = "button",
  className,
  onClick,
  ...rest
}: Props) {
  return (
    <button
      type={type}
      className={cn(
        `w-full rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-wait ${colors[color]} ${sizes[size]}`,
        className
      )}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
