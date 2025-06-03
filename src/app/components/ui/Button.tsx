import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/app/lib/utils/others";

const buttonVariants = cva(
  "btn focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "btn-primary",
        outline: "btn-outline",
        danger: "btn-danger",
        edit: "btn-edit",
        facebook: "btn-facebook",
        google: "btn-google",
      },
      size: {
        default: "px-4 py-2 text-base",
        sm: "px-3 py-1 text-sm",
        lg: "px-5 py-3 text-lg",
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
    }
    , ref) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = isLoading || disabled;

    return (
      <Comp
        ref={ ref }
        disabled={ isDisabled }
        className={ cn(
          buttonVariants({ variant, size }),
          fullWidth ? "w-full" : "w-fit",
          className
        ) }
        { ...props }
      >
        { isLoading ? (
          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"/>
        ) : (
          <>
            { icon && <span className="inline-flex items-center">{ icon }</span> }
            <span className="whitespace-nowrap">{ children }</span>
            { iconRight && <span className="inline-flex items-center">{ iconRight }</span> }
          </>
        ) }
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
