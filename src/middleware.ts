import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const AUTH_PATHS = ['/login'];
const EXCLUDED_NEXT_PATHS = ['/api', '/favicon.ico', '/_next'];

export default async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const nextRouteTriggered = EXCLUDED_NEXT_PATHS.some((path) =>
    pathname.includes(path)
  );

  if (nextRouteTriggered) {
    return NextResponse.next();
  }

  const authRouteVisited = AUTH_PATHS.some((authPath) => authPath === pathname);

  // if user IS authenticated and tries to navigate to auth page => redirect to dashboard page
  if (authRouteVisited && !!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // if user IS NOT authenticated and tries to navigate to dashboard page => redirect to auth page
  if (!authRouteVisited && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
