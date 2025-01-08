"use client"

import Link from "next/link";

import { FaBars, FaCircleUser } from "react-icons/fa6";

import BasicButton from "../common/BasicButton";
import { logout } from '@/app/actions/auth.actions';
import Dropdown from "../common/Dropdown";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function DesktopNav( {isAuth}: {isAuth: boolean}) {
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  const navLinks = [
    {
    name: "Collection",
    href: "/plants/collected"
    },
    {
      name: "Sold",
      href: "/plants/sold"
    },
    {
      name: "Purchased",
      href: "/plants/purchased"
    }
  ]

  return (
    <div className="flex gap-2 align-middle">
      {!isAuth
        ? <>
          <BasicButton color="cyan">
            <Link href="/">Home</Link>
          </BasicButton>
          <BasicButton color="cyan">
            <Link href="/signup">Sign Up</Link>
          </BasicButton>
          <BasicButton color="cyan">
            <Link href="/signin">Login</Link>
          </BasicButton>
        </>
        :<>
          <button type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
            <span className="sr-only">Open main menu</span>
            <FaBars size={50}/>
          </button>
            <section className="hidden w-full md:block md:w-auto" id="navbar-multi-level">
            <ul className="flex flex-col items-center font-medium p-4 md:p-0 md:flex-row gap-5">
              <li>
                <Link href="/dashboard" className="hover:text-green-600">Dashboard</Link>
              </li>
              <li className="relative">
                <Dropdown title="Plants Lists" className="hover:text-green-600">
                  <ul className="text-sm text-gray-900">
                    {
                      navLinks.map((el)=>
                        <li key={el.name + 'dropdown-link'} className={`hover:bg-gray-100 rounded-lg ${el.href === pathname ? "bg-green-100": ""}`}>
                          <Link href={el.href} className="block px-4 py-2">{el.name}</Link>
                        </li>
                      )
                    }
                  </ul>
                </Dropdown>
              </li>
              <li>
                <Link href="/expenses" className="hover:text-green-600">Expenses</Link>
              </li>
              <li className="relative block">
                <Dropdown title="Settings" icon={<FaCircleUser size={40} className="hover:text-green-600"/>}>
                  <ul className="text-sm text-gray-900">
                    <li className={`hover:bg-gray-100 rounded-lg ${'/user' === pathname ? "bg-green-100": ""}`}>
                      <Link href="/user" className="block px-4 py-2 ">Profile</Link>
                    </li>
                    <li  className="hover:bg-gray-100 rounded-lg">
                      <button onClick={logout} className="block px-4 py-2">Logout</button>
                    </li>
                  </ul>
                </Dropdown>
              </li>
            </ul>
          </section>
        </>
      }
    </div>
  );
}
