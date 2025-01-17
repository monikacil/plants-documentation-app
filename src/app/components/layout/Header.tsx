import Link from "next/link";
import { cookies } from 'next/headers'

import Navigation from "./Navigation";
import Logo from "./Logo";

import { cn } from "@/app/lib/utils";

const COOKIE_NAME = process.env.COOKIE_NAME as string

export default async function Header({ className }: { className?: string }) {
  const cookieStore = await cookies()
  const session = cookieStore.get(COOKIE_NAME)

  const isAuth = session ? true : false

  return (
    <header className={ cn("w-full flex-none h-[70px]", className) }>
      <nav className="h-full flex items-center justify-between">
        <Link href="/dashboard" className="w-80 flex">
          <Logo size="xl" />
        </Link>
        <Navigation isAuth={ isAuth } />
      </nav>
    </header>
  );
}
