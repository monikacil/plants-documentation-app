"use client";

import * as React from "react";
import { cn } from "@/app/lib/utils/others";
import { Check } from "lucide-react";

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "onChange"> {
  onChange?: (value: string) => void;
  errors?: string;
  isLoading?: boolean;
  showSuccess?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      onChange,
      errors,
      isLoading,
      showSuccess,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <div className="w-full">

        <div className="relative">
          <input
            ref={ ref }
            type={ type }
            disabled={ isDisabled }
            className={ cn(
              "flex h-10 w-full rounded-md border px-3 py-2 text-base shadow-sm transition-colors pr-9",
              "bg-background text-foreground placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-60",
              errors
                ? "border-destructive focus-visible:ring-destructive"
                : "border-input",
              className
            ) }
            onChange={ (e) => onChange?.(e.target.value) }
            { ...props }
          />

          {/* Spinner */ }
          { isLoading && (
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
          ) }

          {/* Success check */ }
          { showSuccess && !isLoading && (
            <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
          ) }
        </div>

        {/* Reserved error line */ }
        <p
          className={ cn(
            "mt-1 text-xs transition-opacity",
            errors ? "opacity-100 text-destructive" : "opacity-0"
          ) }
        >
          { errors || "" }
        </p>

      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
