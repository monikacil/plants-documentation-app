"use client";

import Link from "next/link";
import { FaArrowRightToBracket } from "react-icons/fa6";
import clsx from "clsx";
import { navigation } from "@/app/configs/navigation.config";

type Props = {
  collapsed: boolean;
  pathname: string;
  onLinkClick: () => void;
  formAction: (payload: FormData) => void;
};

export function SidebarNav({ collapsed, pathname, onLinkClick, formAction }: Props) {
  return (
    <nav className="flex flex-1 flex-col justify-between overflow-y-auto px-2 pb-10">
      <ul className="space-y-2">
        { navigation.map(({ label, href, icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <li key={ href }>
              <Link
                href={ href }
                className={ clsx(
                  "sidebar-link group relative overflow-hidden px-3",
                  isActive && "sidebar-link-active"
                ) }
                aria-current={ isActive ? "page" : undefined }
                onClick={ onLinkClick }
              >
                <span className="sidebar-icon">{ icon }</span>
                <span
                  className={ clsx(
                    "sidebar-text",
                    collapsed ? "sidebar-text-collapsed" : "sidebar-text-expanded"
                  ) }
                >
                  { label }
                </span>
              </Link>
            </li>
          );
        }) }
      </ul>

      <form action={ formAction }>
        <button
          type="submit"
          className="sidebar-link group relative overflow-hidden mt-3 w-full px-3"
        >
          <span className="sidebar-icon">
            <FaArrowRightToBracket />
          </span>
          <span
            className={ clsx(
              "sidebar-text",
              collapsed ? "sidebar-text-collapsed" : "sidebar-text-expanded"
            ) }
          >
            Log Out
          </span>
        </button>
      </form>
    </nav>
  );
}
