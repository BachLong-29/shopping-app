import { NextResponse } from "next/server";

export function POST() {
  const response = NextResponse.json(
    { message: "Đăng xuất thành công" },
    { status: 200 }
  );

  response.cookies.set("access_token", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });

  response.cookies.set("refresh_token", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });

  return response;
}
