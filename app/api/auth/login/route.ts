import { NextResponse } from "next/server";
import User from "@/core/schema/User";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { serialize } from "cookie";
import { signToken } from "@/lib/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: any) {
  await connectDB();
  try {
    const body = await req.json();
    const { email, password } = body;

    // Kiểm tra user có tồn tại không
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Email hoặc mật khẩu không đúng" },
        { status: 401 }
      );
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Mật khẩu không đúng" },
        { status: 401 }
      );
    }

    // Tạo JWT
    const token = signToken(user);
    // Tạo cookie chứa token
    const serializedCookie = serialize("token", token, {
      httpOnly: true, // Ngăn chặn truy cập từ JavaScript
      secure: process.env.NODE_ENV === "production", // Chỉ dùng HTTPS ở production
      sameSite: "strict", // Bảo vệ CSRF
      maxAge: 86400, // Hết hạn sau 1 ngày (86400 giây)
      path: "/", // Cookie có hiệu lực trên toàn trang
    });

    // Trả về response với cookie
    const response = NextResponse.json(
      {
        message: "Đăng nhập thành công",
        user,
        access_token: token,
        status: "success",
      },
      { status: 200 }
    );
    response.headers.set("Set-Cookie", serializedCookie);
    return response;
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server", error }, { status: 500 });
  }
}
