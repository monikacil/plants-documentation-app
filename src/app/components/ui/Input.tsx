import * as React from "react";
import { cn } from "@/app/lib/utils/others";
import { usePasswordToggle } from "@/app/lib/hooks/UsePasswordToggle";
import { PasswordToggleIcon } from "@/app/components/common/PasswordToggleIcon";
import { ErrorMessage } from "@/app/components/common/ErrorMessage";

interface InputProps extends Omit<React.ComponentProps<"input">, "onChange"> {
  errors?: string[] | undefined;
  name: string;
  onChange: (value: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, name, errors = [], onChange, ...props }, ref) => {
    const [showError, setShowError] = React.useState(false);
    const { showPassword, toggle, ref: localRef } = usePasswordToggle<HTMLInputElement>();

    React.useEffect(() => {
      setShowError(!!errors?.length);
    }, [errors]);

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;
    const inputId = props.id ?? name;
    const errorId = `${ inputId }-error`;

    const handleIconKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    };

    return (
      <>
        <div className="relative w-full">
          <input
            id={ inputId }
            type={ inputType }
            name={ name }
            className={ cn(
              "input",
              showError && "input-invalid",
              className
            ) }
            onChange={ (e) => {
              setShowError(false);
              onChange(e.target.value);
            } }
            ref={ (node) => {
              localRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref && typeof ref === "object") ref.current = node;
            } }
            aria-invalid={ showError || undefined }
            aria-describedby={ showError ? errorId : undefined }
            { ...props }
          />
          { isPassword && (
            <PasswordToggleIcon
              show={ showPassword }
              onClick={ toggle }
              onKeyDown={ handleIconKeyDown }
              label={ showPassword ? "Hide password" : "Show password" }
            />
          ) }
        </div>
        <ErrorMessage errors={ errors || [] } id={ errorId }/>
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
