"use client";

import { usePathname } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { logout } from "@/actions/auth.actions";

import { SidebarHeader } from "./SidebarHeader";
import { SidebarNav } from "./SidebarNav";
import { SidebarToggleButton } from "./SidebarToggleButton";
import { SidebarOverlay } from "./SidebarOverlay";

export function Sidebar() {
  const pathname = usePathname();
  const { data } = useSession();
  const [, formAction] = useActionState(logout, undefined);

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sidebarRef = useRef<HTMLElement>(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (mobileOpen && isMobile) setCollapsed(false);
  }, [mobileOpen, isMobile]);

  useEffect(() => {
    if (sidebarRef.current) {
      if (!mobileOpen && isMobile) sidebarRef.current.setAttribute("inert", "");
      else sidebarRef.current.removeAttribute("inert");
    }
  }, [mobileOpen, isMobile]);

  const toggleSidebar = () => setMobileOpen((prev) => !prev);

  if (!data?.user) return null;

  return (
    <>
      <SidebarToggleButton open={ mobileOpen } onClick={ toggleSidebar } />

      <aside
        ref={ sidebarRef }
        className={ clsx(
          "sidebar sidebar-gradient-dark z-40 fixed md:static top-0 left-0 transition-all duration-300 ease-in-out",
          collapsed ? "sidebar-collapsed" : "sidebar-expanded",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "md:relative md:translate-x-0"
        ) }
      >
        <SidebarHeader collapsed={ collapsed } onToggle={ () => setCollapsed(!collapsed) } />

        <SidebarNav
          collapsed={ collapsed }
          pathname={ pathname }
          onLinkClick={ () => setMobileOpen(false) }
          formAction={ formAction }
        />
      </aside>

      <SidebarOverlay open={ mobileOpen } onClick={ () => setMobileOpen(false) } />
    </>
  );
}
