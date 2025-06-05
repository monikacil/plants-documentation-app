import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/app/lib/utils/others";
import { Spinner } from "@/app/components/common/Spinner";

const buttonVariants = cva(
  "btn focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
        sm: "px-3 py-2 text-base",
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
        { isLoading && (
          <Spinner/>
        ) }
        <span className={ cn(
          "flex items-center justify-center",
          isLoading ? "opacity-0" : "opacity-100",
          children && "gap-2"
        ) }>
          { icon &&
            <span className={ cn(!children && "inline-flex justify-center items-center w-9 h-9") }>{ icon }</span> }
          <span className="whitespace-nowrap">{ children }</span>
          { iconRight && <span className="inline-flex justify-center items-center">{ iconRight }</span> }
        </span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
