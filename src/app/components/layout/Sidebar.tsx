"use client";

import { usePathname } from "next/navigation";
import { useActionState, useState } from "react";
import Link from "next/link";
import { FaBars, FaChevronLeft, FaChevronRight, } from "react-icons/fa";
import clsx from "clsx";
import Logo from "@/app/components/layout/Logo.tsx";
import { logout } from "@/app/actions/auth.ts";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { navigation } from "@/app/configs/navigation.config.tsx";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();
  const { data } = useSession();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, formAction] = useActionState(logout, undefined);

  const toggleSidebar = () => {
    setMobileOpen((prev) => !prev);
  };

  if (!data?.user) return null;

  return (
    <>
      <button
        onClick={ toggleSidebar }
        aria-expanded={ mobileOpen }
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-primary-light dark:bg-primary-dark text-white shadow-lg"
      >
        <FaBars/>
      </button>

      <aside
        aria-hidden={ !mobileOpen }
        className={ clsx(
          "fixed top-0 left-0 z-40 h-screen bg-sidebar-light dark:bg-sidebar-dark text-text-light dark:text-text-dark shadow-lg transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "md:relative md:translate-x-0"
        ) }
      >
        <div className="flex items-center justify-between p-5 h-16">
          { collapsed
            ? <div className="w-[48px]"/>
            : <Logo size="md"/> }
          <button
            onClick={ () => setCollapsed(!collapsed) }
            aria-label="collapsed sidebar toggle button"
            className="hidden md:flex p-2 rounded-full hover:bg-border-light dark:hover:bg-border-dark transition"
          >
            <span className="transition-transform duration-300 inline-block">
              { collapsed ? <FaChevronRight/> : <FaChevronLeft/> }
            </span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2">
          <ul className="space-y-1">
            { navigation.map(({ label, href, icon }) => {
              const isActive = pathname.startsWith(href);
              return (
                <li key={ href }>
                  <Link
                    href={ href }
                    className={ clsx(
                      "h-10 flex items-center gap-3 py-2 px-3 rounded-lg transition group",
                      isActive
                        ? "bg-primary-light dark:bg-primary-dark text-white font-semibold shadow-md"
                        : "hover:bg-border-light dark:hover:bg-border-dark"
                    ) }
                    aria-current={ isActive ? "page" : undefined }
                    onClick={ () => setMobileOpen(false) }
                  >
                    <span
                      className={ clsx(
                        "flex-shrink-0 text-xl transition-transform duration-300 group-hover:scale-110",
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
          <form action={ formAction }>
            <button type="submit" className={ clsx(
              "w-full flex gap-3 py-2 px-3 rounded-lg transition group cursor-pointer hover:bg-border-light dark:hover:bg-border-dark",
            ) }>
              <span
                className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <FaArrowRightToBracket/>
              </span>
              { !collapsed && <span className="truncate w-full text-left">Log Out</span> }
            </button>

          </form>
        </nav>
      </aside>

      { mobileOpen && (
        <div
          className="fixed inset-0 z-30 backdrop-blur-sm bg-black/50 transition-opacity md:hidden"
          role="presentation"
          onClick={ () => setMobileOpen(false) }
        />
      ) }
    </>
  );
}
