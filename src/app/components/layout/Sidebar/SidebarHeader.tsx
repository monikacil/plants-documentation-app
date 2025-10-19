"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Logo } from "@/app/components/layout/Logo";

type Props = {
  collapsed: boolean;
  onToggle: () => void;
};

export function SidebarHeader({ collapsed, onToggle }: Props) {
  return (
    <div className="sidebar-header">
      { collapsed ? <div className="w-[48px]" /> : <Logo size="md" className="ml-3" /> }
      <button
        onClick={ onToggle }
        aria-label={ collapsed ? "Expand sidebar" : "Collapse sidebar" }
        className="sidebar-toggle"
      >
        { collapsed ? <FaChevronRight /> : <FaChevronLeft /> }
      </button>
    </div>
  );
}
