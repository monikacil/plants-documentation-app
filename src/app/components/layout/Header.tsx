import Image from "next/image";
import Link from "next/link";
import { cookies } from 'next/headers'
import DesktopNav from "./DesktopNav";
import { NavMobile } from "./MobileNav";

const COOKIE_NAME = process.env.COOKIE_NAME as string

export default async function Header() {
  const cookieStore = await cookies()
  const session = cookieStore.get(COOKIE_NAME)

  const isAuth = session ? true : false

  return (
    <header className="bg-primary-green-0 bg-opacity-80 w-full h-20 flex-none px-3 lg:px-4 py-2 flex justify-between items-center border border-t-0 border-x-0 border-b-1 shadow-md">
      <Link href="/">
        <Image
          src="/images/logo.png"
          width={280}
          height={20}
          alt="Logo"
        />
      </Link>
      <DesktopNav />
      <NavMobile isAuth={isAuth} />
    </header>
  );
}