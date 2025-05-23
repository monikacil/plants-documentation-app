"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { UseOutsideClick } from "@/app/lib/hooks/UseOutsideClick";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { cn } from "@/app/lib/utils/others";

type Props = {
  children: React.ReactNode;
  title: string;
  className?: string;
  icon?: React.ReactNode | undefined;
};

export default function Dropdown({ children, title, className, icon }: Props) {
  const pathname = usePathname();

  const ref = UseOutsideClick(() => {
    setDropdownCollapsed(false);
  });

  const [dropdownCollapsed, setDropdownCollapsed] = useState(false);

  useEffect(() => {
    setDropdownCollapsed(false);
  }, [pathname]);

  const handleDropdownClick = () => {
    setDropdownCollapsed((prev) => !prev);
  };

  return (
    <div id={ `dropdown-ref-${ title }` } ref={ ref }>
      <button
        onClick={ handleDropdownClick }
        className={ cn(
          "flex items-center justify-between w-full py-2 px-3 text-gray-900",
          className
        ) }
      >
        { !icon ? (
          <>
            { title }
            { dropdownCollapsed ? (
              <FaChevronUp size={ 15 } className="ml-1"/>
            ) : (
              <FaChevronDown size={ 15 } className="ml-1"/>
            ) }
          </>
        ) : (
          icon
        ) }
      </button>
      { dropdownCollapsed ? (
        <div
          className="z-10 absolute right-0 mt-2 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
          { children }
        </div>
      ) : null }
    </div>
  );
}
