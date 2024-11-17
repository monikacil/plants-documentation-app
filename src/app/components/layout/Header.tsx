import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full h-20 flex-none px-3 lg:px-4 py-2 flex justify-between items-center border border-t-0 border-x-0 border-b-1 shadow-md">
      <Link href="/">
        <Image
          src="/images/logo.png"
          width={350}
          height={60}
          alt="Logo"
        />
      </Link>
      <nav>
         <Link className="mr-4" href="/signup">
          Sign Up
        </Link>
         <Link href="/signin">
          Sign In
        </Link>
      </nav>
    </header>
  );
}