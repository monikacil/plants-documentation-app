"use client";
import { useState } from "react";

import { useOutsideClick } from "@/app/lib/hooks/useOutsideClick";

type Props = {
  children: React.ReactNode;
  content: React.ReactNode;
};

export default function Popover({ children, content }: Props) {
  const [show, setShow] = useState(false);
  const ref = useOutsideClick(() => {
    setShow(false);
  });

  const handleMouseOver = () => {
    setShow(true);
  };

  const handleMouseLeft = () => {
    setShow(false);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeft}
      className="w-fit h-fit relative flex justify-center"
    >
      <div onClick={() => setShow(!show)}>{children}</div>
      <div
        hidden={!show}
        className="min-w-fit w-12 h-fit absolute bottom-full right-0 z-50 transition-all"
      >
        <div className="rounded-full text-base-gray-900 bg-white py-2 px-3 mb-1 border border-base-gray-500 shadow-xl">
          {content}
        </div>
      </div>
    </div>
  );
}
