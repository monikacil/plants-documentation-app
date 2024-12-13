import Image from "next/image";
import { cookies } from 'next/headers'
import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";

import Navigation from "./Navigation";

const COOKIE_NAME = process.env.COOKIE_NAME as string

export default async function Header() {
  const cookieStore = await cookies()
  const session = cookieStore.get(COOKIE_NAME)

  const isAuth = session ? true : false

  return (
    <header className="bg-primary-green-0 bg-opacity-80 w-full flex-none">
     <Navbar fluid className="w-full justify-between items-center">
      <NavbarBrand href="/">
        <Image
          src="/images/logo.png"
          width={280}
          height={20}
          alt="Logo"
        />
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <Navigation isAuth={ isAuth } />
      </NavbarCollapse>
    </Navbar>
    </header>
  );
}
