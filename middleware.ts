import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const isAuthenticated = !!(accessToken || refreshToken);

  const currentPath = req.nextUrl.pathname;
  const isLoginPage = currentPath === "/login";

  if (isLoginPage) {
    return isAuthenticated
      ? NextResponse.redirect(new URL("/", req.url))
      : NextResponse.next();
  }

  return !isAuthenticated
    ? NextResponse.redirect(new URL("/login", req.url))
    : NextResponse.next();
}

export const config = {
  matcher: ["/my-task/:path*", "/cart", "/login"],
};
