import { NextRequest, NextResponse } from "next/server";

const NON_AUTH_PATH = ["/login", "/register"];

const AUTH_PATH = ["/dashboard"];

export function middleware(request: NextRequest) {
  // Example: Redirect unauthenticated users to the login page
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("_SSID");
  const isAuthenticated = !!token;
  
  if (!isAuthenticated && AUTH_PATH.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && NON_AUTH_PATH.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
