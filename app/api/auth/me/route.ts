import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/auth";
import User from "@/core/schema/User";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Chưa đăng nhập" }, { status: 401 });
  }

  const payload = verifyAccessToken(token);
  if (!payload) {
    return NextResponse.json({ message: "Token không hợp lệ hoặc đã hết hạn" }, { status: 401 });
  }

  await connectDB();
  const user = await User.findById(payload._id).select("-password");
  if (!user) {
    return NextResponse.json({ message: "Người dùng không tồn tại" }, { status: 404 });
  }

  return NextResponse.json({ user });
}
