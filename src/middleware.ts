import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // For protected routes (like /applications)
  if (pathname.startsWith("/applications")) {
    const sessionCookie = request.cookies.get("connect.sid");

    if (!sessionCookie) {
      const loginUrl = new URL(
        "/login",
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      );
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
