"use client";

import type { CustomFlowbiteTheme } from "flowbite-react";
import { Button, Flowbite } from "flowbite-react";
import { ComponentPropsWithoutRef } from "react";

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: "bg-base-green-500 hover:bg-base-green-600 text-white",
      warning: "bg-warning-500 hover:bg-warning-600 text-white",
      danger: "bg-danger-500 hover:bg-danger-600 text-white",
      info: "bg-blue-500 hover:bg-blue-600 text-white",
    }
  },
};

type Props = ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode,
  size?: "xs"|"sm"|"md"|"lg"|"xl"
  color?: "primary" | "warning" | "danger" | "info",
  type?: "submit" | "button",
  isProcessing?: boolean,
  wide?: boolean,
  fullSized?: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any) => void | Promise<any> | undefined,
}

export default function BasicButton({ children, size, color, type, isProcessing, wide=false, fullSized=false, onClick }: Props) {
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Button color={ color || "primary" } size={ size } type={ type } disabled={ isProcessing } pill className={ wide ? "px-7" : "" } fullSized={ fullSized } onClick={ onClick }>
        { children }
      </Button>
    </Flowbite>
  );
}