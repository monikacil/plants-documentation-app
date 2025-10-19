"use client";

import { FaBars } from "react-icons/fa";

type Props = {
  open: boolean;
  onClick: () => void;
};

export function SidebarToggleButton({ open, onClick }: Props) {
  return (
    <button
      onClick={ onClick }
      aria-expanded={ open }
      className="md:hidden fixed top-4 right-4 z-50 p-3 text-2xl rounded-full bg-primary-light text-white shadow-lg"
    >
      <FaBars />
    </button>
  );
}
