"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/app/lib/utils/others";
import { Spinner } from "@/app/components/common/Spinner";

const buttonVariants = cva(
  [
    "btn",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light/70",
    "transition-all duration-200 select-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "btn-primary",
        outline: "btn-outline",
        danger: "btn-danger",
        edit: "btn-edit",
        link: "btn-link",
        facebook: "btn-facebook",
        google: "btn-google",
      },
      size: {
        default: "px-4 py-3 md:py-2 text-base",
        sm: "px-3 py-2 text-sm",
        lg: "px-5 py-3 text-lg",
        icon: "h-9 w-9 flex items-center justify-center rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      icon,
      iconRight,
      fullWidth = true,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = isLoading || disabled;

    return (
      <Comp
        ref={ ref }
        disabled={ isDisabled }
        className={ cn(
          buttonVariants({ variant, size }),
          fullWidth ? "w-full" : "w-fit",
          "relative font-medium rounded-full",
          isDisabled && "opacity-70 cursor-not-allowed",
          className
        ) }
        { ...props }
      >
        {/* Spinner overlay */ }
        { isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Spinner className="h-5 w-5 text-white" />
          </span>
        ) }

        {/* Content */ }
        <span
          className={ cn(
            "flex items-center justify-center transition-opacity duration-150",
            isLoading ? "opacity-0" : "opacity-100",
            children && "gap-2"
          ) }
        >
          { icon && (
            <span
              className={ cn(
                !children && "inline-flex justify-center items-center w-9 h-9"
              ) }
            >
              { icon }
            </span>
          ) }
          { children && <span className="whitespace-nowrap">{ children }</span> }
          { iconRight && (
            <span className="inline-flex justify-center items-center">
              { iconRight }
            </span>
          ) }
        </span>
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
