"use client";

import { forwardRef, InputHTMLAttributes, useEffect, useRef, useState, } from "react";
import { cn } from "@/app/lib/utils/others";
import { HiEye, HiEyeOff } from "react-icons/hi";

type Props = {
  label?: string;
  value?: string | number;
  errors?: string[] | undefined | null;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      value,
      errors,
      onChange,
      className,
      type = "text",
      name,
      required,
      id,
      ...rest
    },
    ref
  ) => {
    const [showError, setShowError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const localRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      setShowError(!!errors?.length);
    }, [errors]);

    const togglePassword = () => {
      setShowPassword((prev) => !prev);
      localRef.current?.focus();
    };

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    const inputId = id ?? name;
    const errorId = `${ inputId }-error`;

    return (
      <div className="flex flex-col gap-1 relative">
        { label && inputId && (
          <label
            htmlFor={ inputId }
            className="text-sm font-medium text-gray-700"
          >
            { label } { required && <span aria-hidden="true">*</span> }
          </label>
        ) }

        <input
          id={ inputId }
          ref={ (node) => {
            localRef.current = node;
            if (ref && typeof ref === "function") ref(node);
            else if (ref && typeof ref === "object") ref.current = node;
          } }
          type={ inputType }
          value={ value }
          onChange={ (e) => {
            setShowError(false);
            onChange(e.target.value);
          } }
          aria-label={ name }
          aria-invalid={ showError || undefined }
          aria-describedby={ showError ? errorId : undefined }
          aria-required={ required || undefined }
          name={ name }
          { ...rest }
          className={ cn(
            "w-full rounded-full border py-2 px-4 pr-10 text-sm focus:ring-2 focus:outline-none transition",
            showError
              ? "bg-red-50 border-red-500 text-red-700 placeholder-red-400 focus:ring-red-500"
              : "border-gray-300 focus:ring-base-green-500 focus:border-base-green-500",
            className
          ) }
        />

        { isPassword && (
          <span
            onClick={ togglePassword }
            aria-label="Show password"
            tabIndex={ 0 }
            className="absolute right-3 top-[10px] text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            { showPassword ? <HiEyeOff size={ 18 }/> : <HiEye size={ 18 }/> }
          </span>
        ) }

        { showError && errors && errors?.length > 0 && (
          <div
            id={ errorId }
            role="alert"
            aria-live="assertive"
            className="text-sm text-red-600 mt-1"
          >
            { errors?.map((err, idx) => (
              <p key={ idx }>{ err }</p>
            )) }
          </div>
        ) }
      </div>
    );
  }
);


Input.displayName = "Input";
export default Input;