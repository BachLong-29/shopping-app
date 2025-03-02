import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies(); // Lấy cookies từ request
  const token = cookieStore.get("token")?.value; // Lấy giá trị của cookie "token"

  if (!token) {
    return NextResponse.json({ message: "Chưa đăng nhập" }, { status: 401 });
  }

  const user = verifyToken(token); // Giải mã token để lấy user

  if (!user) {
    return NextResponse.json(
      { message: "Token không hợp lệ" },
      { status: 403 }
    );
  }

  return NextResponse.json({ user }); // Trả về thông tin người dùng
}
