"use client";

import { ComponentPropsWithoutRef } from "react";
import { Button, CustomFlowbiteTheme } from "flowbite-react";
import { cn } from "@/app/lib/utils";

const customTheme: CustomFlowbiteTheme["button"] = {
  color: {
    cyan: "text-white bg-cyan-700 hover:bg-cyan-800",
  },
};

type Props = ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode,
  size?: 'xs'|'sm'|'md'|'lg'|'xl'
  color?: string,
  gradientMonochrome?: string | undefined,
  outline?: boolean,
  pill?: boolean,
  isProcessing?: boolean,
  className?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any) => void | Promise<any> | undefined,
}

export default function BasicButton({
  children,
  size = "sm",
  color = "blue",
  gradientMonochrome,
  outline = false,
  pill = false,
  isProcessing = false,
  className,
  onClick,
  ...rest
}: Props) {
  return (
    <Button
      size={ size }
      color={ color }
      gradientMonochrome={ gradientMonochrome}
      outline={ outline }
      pill={ pill }
      isProcessing={ isProcessing  }
      theme={ customTheme }
      onClick={onClick}
      className={cn("items-center", className)}
      {...rest}
    >
      { children }
    </Button>
  )
}
