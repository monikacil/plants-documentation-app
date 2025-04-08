import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse, NextRequest } from "next/server";

interface KindeAuth {
  user: Record<string, unknown> | null;
  token: string | null;
}

interface MiddlewareRequest {
  kindeAuth: KindeAuth;
}

export default withAuth(
  async function middleware(req: NextRequest & MiddlewareRequest) {
    if (req.method === "HEAD") {
      return NextResponse.next();
    }
    const { kindeAuth } = req;

    const publicPaths = ["/"];
    const isPublicPath = publicPaths.includes(req.nextUrl.pathname);


    // Explicitly handle the home page ("/")
    if (isPublicPath && kindeAuth.user) {
      console.log(22)
      // Redirect to dashboard if authenticated
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Redirect to login (home page) if not authenticated and accessing protected routes
    if (!kindeAuth.user) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Allow access to authenticated users for protected routes
    return NextResponse.next();
  },
  {
    // Specify public paths that don't require authentication
    publicPaths: ["/"],
    isReturnToCurrentPage: true,
  }
);


export const config = {
  matcher: [
    '/',
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/((?!api|_next/static|_next/image|favicon.ico|images|manifest.json).*)',],
};
