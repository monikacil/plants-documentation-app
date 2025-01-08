import Image from "next/image";
import { cookies } from 'next/headers'

import Navigation from "./Navigation";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

const COOKIE_NAME = process.env.COOKIE_NAME as string

export default async function Header({ className }: {className?: string}) {
  const cookieStore = await cookies()
  const session = cookieStore.get(COOKIE_NAME)

  const isAuth = session ? true : false

  return (
    <header className={cn("w-full flex-none h-[95px]", className)}>
      <nav className="h-full flex flex-wrap items-center justify-between">
        <Link href="/dashboard" className="relative w-80 h-full">
          <Image src="/images/logo.png" alt="logo" sizes="80" fill priority/>
        </Link>
        <Navigation isAuth={isAuth} />
      </nav>
    </header>
  );
}
