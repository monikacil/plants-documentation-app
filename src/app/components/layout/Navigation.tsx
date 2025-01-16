"use client"

import Link from "next/link";

import { FaBars, FaCircleUser } from "react-icons/fa6";

import Dropdown from "../common/Dropdown";
import { usePathname } from "next/navigation";
import { NAVIGATION_CONFIG } from "@/app/lib/navConfig"
import { generateUniqKey } from "@/app/lib/utils";

export default function Navigation({ isAuth }: { isAuth: boolean }) {
  const pathname = usePathname();
  const navLinks = NAVIGATION_CONFIG

  type Link = {
    name: string,
    href?: string,
    type?: string,
    action?: () => Promise<void>;
  }

  type LinkList = {
    name: string,
    href?: string,
    type?: string,
    icon?: boolean,
    options?: Link[],
  }

  return (
    <div className="flex gap-2 align-middle">
      { !isAuth
        ? <>
        </>
        :<>
          <button type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
            <span className="sr-only">Open main menu</span>
            <FaBars size={ 50 }/>
          </button>
          <section className="hidden w-full md:block md:w-auto">
            <ul className="flex flex-col items-center font-medium p-4 md:p-0 md:flex-row gap-5">
            {
              navLinks.map((el: LinkList)=> {
                if(el.type === "dropdown") {
                  return <li key={ generateUniqKey(`dropdown-${el.name}`) } className="relative">
                    <Dropdown title={ el.name } className="hover:text-gray-green-700" icon={ el.icon ? <FaCircleUser size={ 40 } className="hover:text-gray-green-700"/> : undefined }>
                      <ul className="text-sm text-gray-900">
                        {
                          el.options?.map((link: Link)=> {
                            if(link.type === "button" && link.action) {
                              return <li key={ generateUniqKey(`nav-btn-${link.name}`) } className={ `hover:bg-gray-100 rounded-lg ${ link.href === pathname ? "bg-gray-green-200": "" }` }>
                                <button  onClick={ link.action } className="block px-4 py-2 w-full text-left cursor-pointer">{ link.name }</button>
                              </li>
                            } else if(link.href) {
                              return <li key={ generateUniqKey(`nav-link-${link.name}`) } className={ `hover:bg-gray-100 rounded-lg ${ link.href === pathname ? "bg-gray-green-200": "" }` }>
                                <Link href={ link.href } className="block px-4 py-2">{ link.name }</Link>
                              </li>
                            }
                          })
                        }
                      </ul>
                    </Dropdown>
                  </li>
                } else {
                  return <li key={ generateUniqKey(`link-${el.name}`) } className={ `hover:text-gray-green-700 rounded-lg ${ el.href === pathname ? "bg-gray-green-200": "" }` }>
                    <Link href={ el.href ? el.href : '' } className="block px-4 py-2">{ el.name }</Link>
                  </li>
                }
              })
            }
            </ul>
          </section>
        </>
      }
    </div>
  );
}
