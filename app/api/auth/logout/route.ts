import { NextResponse } from "next/server";
import { serialize } from "cookie";

export function POST() {
  const serializedCookie = serialize("token", "", {
    httpOnly: true, // Ngăn chặn truy cập từ JavaScript
    secure: process.env.NODE_ENV === "production", // Chỉ dùng HTTPS ở production
    maxAge: -1,
    path: "/",
  });
  const response = NextResponse.json(
    { message: "Đăng xuất thành công" },
    { status: 200 }
  );
  response.headers.set("Set-Cookie", serializedCookie);
  return response;
}
