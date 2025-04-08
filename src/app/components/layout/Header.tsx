import Link from "next/link";

import Navigation from "./Navigation";
import Logo from "./Logo";

import { cn } from "@/lib/utils/others";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type Props = {
  className?: string;
};

export default async function Header({ className }: Props) {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  return (
    <header className={cn("w-full flex-none h-[70px]", className)}>
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
