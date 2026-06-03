import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyRefreshToken, signAccessToken, signRefreshToken } from "@/lib/auth";
import User from "@/core/schema/User";
import { connectDB } from "@/lib/mongodb";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: "Không có refresh token" }, { status: 401 });
  }

  const payload = verifyRefreshToken(refreshToken);
  if (!payload) {
    return NextResponse.json({ message: "Refresh token không hợp lệ hoặc đã hết hạn" }, { status: 401 });
  }

  await connectDB();
  const user = await User.findById(payload._id).select("-password");
  if (!user) {
    return NextResponse.json({ message: "Người dùng không tồn tại" }, { status: 404 });
  }

  const newAccessToken = signAccessToken(user);
  const newRefreshToken = signRefreshToken(user);

  const isProduction = process.env.NODE_ENV === "production";

  const response = NextResponse.json({ message: "Token đã được làm mới" }, { status: 200 });

  response.cookies.set("access_token", newAccessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 15 * 60,
    path: "/",
  });

  response.cookies.set("refresh_token", newRefreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  return response;
}
