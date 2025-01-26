import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/joseSession";

// 1. Specify protected and public routes
const protectedRoutes = ["/user", "/dashboard", "/expenses"];
const publicRoutes = ["/login", "/signup", "/"];

const COOKIE_NAME = process.env.COOKIE_NAME as string;

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  const session = await decrypt(cookie);

  // 4. Redirect
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (!session?.userId && req.nextUrl.pathname.startsWith("/plants")) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith("/plants")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (
    !isPublicRoute &&
    session?.userId &&
    req.nextUrl.pathname.startsWith("/plants")
  ) {
    NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
