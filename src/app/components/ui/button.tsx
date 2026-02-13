"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils/others";
import { Spinner } from "./spinner.tsx";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        google:
          "border border-red-400/40 bg-background text-foreground hover:border-red-400 hover:bg-red-400/5",

        facebook:
          "border border-blue-500/40 bg-background text-foreground hover:border-blue-500 hover:bg-blue-500/5",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
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
      disabled,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = isLoading || disabled;

    return (
      <Comp
        type={ type }
        ref={ ref }
        disabled={ isDisabled }
        aria-busy={ isLoading }
        className={ cn(
          buttonVariants({ variant, size }),
          isDisabled && "cursor-not-allowed",
          className
        ) }
        { ...props }
      >
        {/* Spinner overlay */ }
        { isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Spinner />
          </span>
        ) }

        {/* Content */ }
        <span
          className={ cn(
            "inline-flex items-center gap-2",
            isLoading && "opacity-0"
          ) }
        >
          { icon && <span className="inline-flex">{ icon }</span> }
          { children }
          { iconRight && <span className="inline-flex">{ iconRight }</span> }
        </span>
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
