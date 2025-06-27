"use client";

import {usePathname} from "next/navigation";
import {useActionState, useEffect, useRef, useState} from "react";
import Link from "next/link";
import {FaBars, FaChevronLeft, FaChevronRight} from "react-icons/fa";
import clsx from "clsx";
import {Logo} from "@/app/components/layout/Logo.tsx";
import {logout} from "@/app/actions/auth.ts";
import {FaArrowRightToBracket} from "react-icons/fa6";
import {navigation} from "@/app/configs/navigation.config.tsx";
import {useSession} from "next-auth/react";

export function Sidebar() {
    const pathname = usePathname();
    const {data} = useSession();

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
                onClick={toggleSidebar}
                aria-expanded={mobileOpen}
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-primary-light dark:bg-primary-dark text-white shadow-lg"
            >
                <FaBars/>
            </button>

            <aside
                ref={sidebarRef}
                className={clsx(
                    "flex flex-col fixed top-0 left-0 z-40 h-screen bg-sidebar-light dark:bg-sidebar-dark text-text-light dark:text-text-dark shadow-lg transition-all duration-300 ease-in-out",
                    collapsed ? "w-16" : "w-80",
                    mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
                    "md:relative md:translate-x-0"
                )}
            >
                <div className="flex items-center justify-between p-5 h-16">
                    {collapsed ? <div className="w-[48px]"/> : <Logo size="md"/>}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        className="hidden md:flex p-1 rounded-full hover:bg-border-light dark:hover:bg-border-dark transition"
                    >
            <span className="transition-transform duration-300 inline-block">
              {collapsed ? <FaChevronRight/> : <FaChevronLeft/>}
            </span>
                    </button>
                </div>

                <nav className="flex flex-1 flex-col justify-between overflow-y-auto px-2 pb-10">
                    <ul className="space-y-1">
                        {navigation.map(({label, href, icon}) => {
                            const isActive = pathname.startsWith(href);
                            return (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className={clsx(
                                            "h-10 flex items-center gap-3 py-2 px-3 rounded-lg transition group",
                                            isActive
                                                ? "bg-primary-light dark:bg-primary-dark text-white font-semibold shadow-md"
                                                : "hover:bg-border-light dark:hover:bg-border-dark"
                                        )}
                                        aria-current={isActive ? "page" : undefined}
                                        onClick={() => setMobileOpen(false)}
                                    >
                    <span className="flex-shrink-0 text-xl transition-transform duration-300 group-hover:scale-110">
                      {icon}
                    </span>
                                        {!collapsed && <span className="truncate w-full">{label}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <form action={formAction}>
                        <button
                            type="submit"
                            className="w-full h-10 flex items-center gap-3 py-2 px-3 rounded-lg transition group cursor-pointer hover:bg-border-light dark:hover:bg-border-dark"
                        >
              <span className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <FaArrowRightToBracket/>
              </span>
                            {!collapsed && (
                                <span className="truncate w-full text-left">Log Out</span>
                            )}
                        </button>
                    </form>
                </nav>
            </aside>

            {mobileOpen && (
                <div
                    className="fixed inset-0 z-30 backdrop-blur-sm bg-black/50 transition-opacity md:hidden"
                    role="presentation"
                    onClick={() => setMobileOpen(false)}
                />
            )}
        </>
    );
}
