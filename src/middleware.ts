import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from './app/lib/joseSession'

// 1. Specify protected and public routes
const protectedRoutes = ['/plants', '/plants/collection', '/user/']
const publicRoutes = ['/signin', '/signup', '/']

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = req.cookies.get('plant-doc-session')?.value;
  const session = await decrypt(cookie);

  // 4. Redirect
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl));
  }

  if (
    !session?.userId &&
    req.nextUrl.pathname.startsWith('/user/') ||
    req.nextUrl.pathname.startsWith('/plants/')
  ) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith('/plants')
  ) {
    return NextResponse.redirect(new URL('/plants', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [ '/', '/signin', '/signup',
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}