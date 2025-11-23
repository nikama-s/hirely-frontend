import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // For protected routes (like /applications)
  if (pathname.startsWith("/applications") || pathname.startsWith("/admin")) {
    const tokenCookie = request.cookies.get("token");

    if (!tokenCookie) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }
  
  // If user is already logged in and tries to access login/register, redirect to applications
  if ((pathname.startsWith("/login") || pathname.startsWith("/register")) && request.cookies.get("token")) {
     return NextResponse.redirect(new URL("/applications", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
