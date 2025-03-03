// middleware.ts (Next.js 15)

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Lấy giá trị token từ cookie
  const currentPath = req.nextUrl.pathname;
  const isLoginPage = currentPath === "/login";
  const isAuthenticated = !!token;

  // check auth in login page.
  if (isLoginPage) {
    return isAuthenticated
      ? NextResponse.redirect(new URL("/", req.url))
      : NextResponse.next();
  }

  // check auth in other page.
  return !isAuthenticated
    ? NextResponse.redirect(new URL("/login", req.url))
    : NextResponse.next();
}

// Chỉ áp dụng middleware cho các route cần bảo vệ
export const config = {
  matcher: ["/", "/login"], // Các route yêu cầu đăng nhập
};
