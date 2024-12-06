import Link from "next/link";
import { logout } from "@/app/actions/auth.actions";
import { cookies } from "next/headers";

const COOKIE_NAME = process.env.COOKIE_NAME as string

export default async function DesktopNav() {
  const cookieStore = await cookies()
  const session = cookieStore.get(COOKIE_NAME)
  return (
      <nav className="hidden sm:block font-semibold">
       {!session
        ? <>
          <Link href="/" className="mr-4 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:to-sky-400 hover:via-emerald-600 hover:from-primary-dark-green">
            Home
          </Link>
          <Link href="/signup" className="mr-4 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:to-sky-400 hover:via-emerald-600 hover:from-primary-dark-green">
            Sign Up
          </Link>
          <Link href="/signin" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:to-sky-400 hover:via-emerald-600 hover:from-primary-dark-green">
            Sign In
          </Link>
        </>
        :<>
          <Link href="/plants" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:to-sky-400 hover:via-emerald-600 hover:from-primary-dark-green">
            Plants
          </Link>
          <button onClick={logout} className="ml-4 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:to-sky-400 hover:via-emerald-600 hover:from-primary-dark-green">
            Logout
          </button>
        </>
        }
      </nav>
  );
}