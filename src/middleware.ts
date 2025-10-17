import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

const PUBLIC_ROUTES = [
  "/",
  "/auth/reset-password",
  "/auth/reset-password-token",
  "/auth/verify-email",
];

function isPublicRoute(path: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => path === route || path.startsWith(route + "/")
  );
}

function isStaticOrSpecial(path: string): boolean {
  return (
    path.startsWith("/.well-known") ||
    path.startsWith("/_next") ||
    path.startsWith("/images") ||
    path.startsWith("/api/auth") ||
    /\.(js|css|png|jpg|jpeg|svg|ico|webmanifest|json)$/.test(path)
  );
}

export default auth((req: NextRequest & { auth: Awaited<ReturnType<typeof auth>> }) => {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  if (isStaticOrSpecial(pathname)) return NextResponse.next();

  const isAuthenticated = !!req.auth;
  const isPublic = isPublicRoute(pathname);

  if (isAuthenticated && (pathname === "/")) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (!isAuthenticated && !isPublic) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*|favicon.ico|images|manifest.json|service-worker.js).*)"],
};
