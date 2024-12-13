"use client";

import { Button, CustomFlowbiteTheme } from "flowbite-react";

const customTheme: CustomFlowbiteTheme["button"] = {
  color: {
    cyan: "text-white bg-cyan-700 hover:bg-cyan-800",
  },
};

interface Props {
  children: React.ReactNode,
  size?: 'xs'|'sm'|'md'|'lg'|'xl'
  color?: string,
  gradientMonochrome?: string | undefined,
  type?: "button" | "submit" | "reset" | undefined,
  outline?: boolean,
  pill?: boolean,
  isProcessing?: boolean,
  disabled?: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any) => void | Promise<any> | undefined,
}

export default function BasicButton({
  children,
  size = "sm",
  color = "blue",
  gradientMonochrome,
  type,
  outline = false,
  pill = false,
  isProcessing = false,
  disabled = false,
  onClick
}: Props) {
  return (
    <Button
      size={ size }
      color={ color }
      gradientMonochrome={ gradientMonochrome}
      type={ type }
      outline={ outline }
      pill={ pill }
      isProcessing={ isProcessing  }
      disabled={ disabled }
      theme={ customTheme }
      onClick={onClick}
      className="items-center"
    >
      { children }
    </Button>
  )
}
