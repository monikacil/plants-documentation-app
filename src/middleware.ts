import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/", "/reset-password", "/reset-password-token", "/verify-email"];

function isPublicRoute(path: string): boolean {
  return PUBLIC_ROUTES.some(route =>
    path === route || path.startsWith(route + "/")
  );
}

function isStaticOrSpecial(path: string): boolean {
  return (
    path.startsWith("/.well-known") ||
    /\.(js|css|png|jpg|jpeg|svg|ico|webmanifest|json)$/.test(path) ||
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.startsWith("/images")
  );
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  if (isStaticOrSpecial(pathname)) return NextResponse.next();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;
  const isPublic = isPublicRoute(pathname);

  if (isAuthenticated && pathname === "/") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (!isAuthenticated && !isPublic) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*|favicon.ico|images|manifest.json|service-worker.js).*)"],
};
