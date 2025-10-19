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
      <ul className="space-y-1">
        { navigation.map(({ label, href, icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <li key={ href }>
              <Link
                href={ href }
                className={ clsx(
                  "sidebar-link group",
                  collapsed && "sidebar-link-collapsed",
                  isActive && "sidebar-link-active"
                ) }
                aria-current={ isActive ? "page" : undefined }
                onClick={ onLinkClick }
              >
                <span
                  className={ clsx(
                    "transition-transform duration-300 group-hover:scale-125 text-xl",
                    collapsed && "mx-auto"
                  ) }
                >
                  { icon }
                </span>
                { !collapsed && <span className="truncate w-full">{ label }</span> }
              </Link>
            </li>
          );
        }) }
      </ul>

      {/* Logout */ }
      <form action={ formAction }>
        <button
          type="submit"
          className={ clsx(
            "sidebar-link group mt-3 w-full",
            collapsed && "sidebar-link-collapsed"
          ) }
        >
          <span
            className={ clsx(
              "transition-transform duration-300 group-hover:scale-125 text-xl",
              collapsed && "mx-auto"
            ) }
          >
            <FaArrowRightToBracket />
          </span>
          { !collapsed && <span className="truncate w-full text-left">Log Out</span> }
        </button>
      </form>
    </nav>
  );
}
