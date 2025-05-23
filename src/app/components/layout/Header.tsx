import Link from "next/link";

import Navigation from "./Navigation";
import Logo from "./Logo";

import { cn } from "@/app/lib/utils/others";

import AddToHomeScreen from "../pwa/AddToHomeScreen";
import {auth} from "@/auth.ts";

type Props = {
  className?: string;
};

export default async function Header({ className }: Props) {
  const isUserAuthenticated = await auth();

  return (
    <header className={cn("w-full py-4", className)}>
      <AddToHomeScreen />

      <nav className='h-full flex items-center justify-between'>
        <Link
          href='/dashboard'
          scroll={false}
          className='w-80 flex'
        >
          <Logo size='xl' />
        </Link>
        {isUserAuthenticated ? <Navigation /> : null}
      </nav>
    </header>
  );
}
