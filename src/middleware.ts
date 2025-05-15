import { NextResponse } from "next/server"
import NextAuth from 'next-auth';
import authConfig from "./auth.config"

const PUBLIC_ROUTES = ["/", "/signin"]

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req) {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (isPublicRoute && isAuthenticated)
    return Response.redirect(new URL("/dashboard", nextUrl));

  if (!isAuthenticated && !isPublicRoute)
    return Response.redirect(new URL("/", nextUrl));

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
