import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Only apply to /admin routes
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  const authCookie = request.cookies.get("admin_auth")

  // If not authenticated and not trying to access the login page, redirect to login
  if (!authCookie && !request.nextUrl.pathname.startsWith("/admin/login")) {
    const loginUrl = new URL("/admin/login", request.url)
    loginUrl.searchParams.set("from", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

