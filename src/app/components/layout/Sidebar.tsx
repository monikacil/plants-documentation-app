"use client";

import { usePathname } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaBars, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import clsx from "clsx";
import { Logo } from "@/app/components/layout/Logo.tsx";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useSession } from "next-auth/react";

import { logout } from "@/actions/auth.actions";
import { navigation } from "@/app/configs/navigation.config";

export function Sidebar() {
  const pathname = usePathname();
  const { data } = useSession();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, formAction] = useActionState(logout, undefined);

  const sidebarRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (mobileOpen && isMobile) {
      setCollapsed(false);
    }
  }, [mobileOpen, isMobile]);

  useEffect(() => {
    if (sidebarRef.current) {
      if (!mobileOpen && isMobile) {
        sidebarRef.current.setAttribute("inert", "");
      } else {
        sidebarRef.current.removeAttribute("inert");
      }
    }
  }, [mobileOpen, isMobile]);

  const toggleSidebar = () => setMobileOpen((prev) => !prev);

  if (!data?.user) return null;

  return (
    <>
      <button
        onClick={ toggleSidebar }
        aria-expanded={ mobileOpen }
        className="md:hidden fixed top-4 right-4 z-50 p-3 text-2xl rounded-full bg-primary-light text-white shadow-lg"
      >
        <FaBars />
      </button>

      <aside
        ref={ sidebarRef }
        className={ clsx(
          "sidebar sidebar-gradient-dark z-40 h-screen fixed md:static top-0 left-0 flex flex-col border-r shadow-lg transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-80",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "md:relative md:translate-x-0"
        ) }
      >
        <div className="sidebar-header">
          { collapsed ? <div className="w-[48px]" /> : <Logo size="md" /> }
          <button
            onClick={ () => setCollapsed(!collapsed) }
            aria-label={ collapsed ? "Expand sidebar" : "Collapse sidebar" }
            className="sidebar-toggle"
          >
            { collapsed ? <FaChevronRight /> : <FaChevronLeft /> }
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-between overflow-y-auto px-2 pb-10">
          <ul className="space-y-1">
            { navigation.map(({ label, href, icon }) => {
              const isActive = pathname.startsWith(href);
              return (
                <li key={ href }>
                  <Link
                    href={ href }
                    className={ clsx(
                      "sidebar-link transition group",
                      isActive && "sidebar-link-active"
                    ) }
                    aria-current={ isActive ? "page" : undefined }
                    onClick={ () => setMobileOpen(false) }
                  >
                   <span className="flex-shrink-0 transition-transform duration-300 group-hover:scale-125">
                      { icon }
                    </span>
                    { !collapsed && <span className="truncate w-full">{ label }</span> }
                  </Link>
                </li>
              );
            }) }
          </ul>

          <form action={ formAction }>
            <button
              type="submit"
              className="w-full h-10 transition group sidebar-link mt-3 hover:text-"
            >
              <span className="flex-shrink-0 transition-transform duration-300 group-hover:scale-125">
                <FaArrowRightToBracket />
              </span>
              { !collapsed && (
                <span className="truncate w-full text-left">Log Out</span>
              ) }
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


// "use client";
//
// export function Sidebar() {
//   const pathname = usePathname();
//   const { data } = useSession();
//   const [, formAction] = useActionState(logout, undefined);
//
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//
//   const sidebarRef = useRef<HTMLElement>(null);
//
//   // 🔹 Detect mobile viewport
//   useEffect(() => {
//     const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
//     checkIsMobile();
//     window.addEventListener("resize", checkIsMobile);
//     return () => window.removeEventListener("resize", checkIsMobile);
//   }, []);
//
//   // 🔹 Expand sidebar when opened on mobile
//   useEffect(() => {
//     if (mobileOpen && isMobile) setCollapsed(false);
//   }, [mobileOpen, isMobile]);
//
//   // 🔹 Disable interactions when sidebar hidden (mobile)
//   useEffect(() => {
//     if (sidebarRef.current) {
//       if (!mobileOpen && isMobile) sidebarRef.current.setAttribute("inert", "");
//       else sidebarRef.current.removeAttribute("inert");
//     }
//   }, [mobileOpen, isMobile]);
//
//   const toggleSidebar = () => setMobileOpen((prev) => !prev);
//
//   if (!data?.user) return null;
//
//   return (
//     <>
//       {/* --- Mobile toggle button --- */ }
//       <button
//         onClick={ toggleSidebar }
//         aria-expanded={ mobileOpen }
//         className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-primary-light text-white shadow-lg"
//       >
//         <FaBars />
//       </button>
//
//       {/* --- Sidebar wrapper --- */ }
//       <div
//         className={ clsx(
//           "relative z-40 flex-shrink-0 transition-all duration-300 ease-in-out",
//           isMobile ? "w-0" : collapsed ? "w-16" : "w-72"
//         ) }
//       >
//         {/* --- Sidebar --- */ }
//         <aside
//           ref={ sidebarRef }
//           className={ clsx(
//             "sidebar sidebar-gradient-dark h-screen fixed md:static top-0 left-0 flex flex-col shadow-lg border-r border-border-light transition-transform duration-300 ease-in-out",
//             collapsed ? "md:w-16" : "md:w-72",
//             mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//           ) }
//         >
//           {/* Header */ }
//           <div className="sidebar-header">
//             { collapsed ? <div className="w-[48px]" /> : <Logo size="md" /> }
//             <button
//               onClick={ () => setCollapsed(!collapsed) }
//               aria-label={ collapsed ? "Expand sidebar" : "Collapse sidebar" }
//               className="sidebar-toggle"
//             >
//               { collapsed ? <FaChevronRight /> : <FaChevronLeft /> }
//             </button>
//           </div>
//
//           {/* Navigation */ }
//           <nav className="flex flex-1 flex-col justify-between overflow-y-auto px-3 pb-10">
//             <ul className="space-y-1">
//               { navigation.map(({ label, href, icon }) => {
//                 const isActive = pathname.startsWith(href);
//                 return (
//                   <li key={ href }>
//                     <Link
//                       href={ href }
//                       className={ clsx(
//                         "sidebar-link",
//                         isActive && "sidebar-link-active"
//                       ) }
//                       aria-current={ isActive ? "page" : undefined }
//                       onClick={ () => setMobileOpen(false) }
//                     >
//                       <span className="flex-shrink-0 text-xl transition-transform duration-200 group-hover:scale-110">
//                         { icon }
//                       </span>
//                       { !collapsed && <span className="truncate w-full">{ label }</span> }
//                     </Link>
//                   </li>
//                 );
//               }) }
//             </ul>
//
//             {/* Logout */ }
//             <form action={ formAction }>
//               <button
//                 type="submit"
//                 className="sidebar-link mt-3 hover:bg-border-light"
//               >
//                 <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
//                   <FaArrowRightToBracket />
//                 </span>
//                 { !collapsed && <span className="truncate w-full">Log Out</span> }
//               </button>
//             </form>
//           </nav>
//         </aside>
//       </div>
//
//       {/* --- Mobile overlay --- */ }
//       { mobileOpen && (
//         <div
//           className="fixed inset-0 z-30 backdrop-blur-sm bg-black/50 transition-opacity md:hidden"
//           role="presentation"
//           onClick={ () => setMobileOpen(false) }
//         />
//       ) }
//     </>
//   );
// }
