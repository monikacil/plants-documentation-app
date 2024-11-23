import Link from "next/link";
import { logout } from "@/app/actions/auth.actions";
import { cookies } from "next/headers";

const COOKIE_NAME = process.env.COOKIE_NAME as string

export default async function DesktopNav() {
  const cookieStore = await cookies()
  const session = cookieStore.get(COOKIE_NAME)
  return (
      <nav className="hidden sm:block">
       {!session
        ? <>
          <Link className="mr-4" href="/">
            Home
          </Link>
          <Link className="mr-4" href="/signup">
            Sign Up
          </Link>
          <Link href="/signin">
            Sign In
          </Link>
        </>
        :<>
          <Link href="/plants">
            Plants
          </Link>
          <button className="ml-4" onClick={logout}>
            Logout
          </button>
        </>
        }
      </nav>
  );
}