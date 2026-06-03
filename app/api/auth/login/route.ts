import { NextResponse } from "next/server";
import User from "@/core/schema/User";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { signAccessToken, signRefreshToken } from "@/lib/auth";

export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email và mật khẩu không được để trống" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Email hoặc mật khẩu không đúng" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Email hoặc mật khẩu không đúng" },
        { status: 401 }
      );
    }

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    const isProduction = process.env.NODE_ENV === "production";

    const response = NextResponse.json(
      {
        message: "Đăng nhập thành công",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      },
      { status: 200 }
    );

    response.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 15 * 60, // 15 minutes
      path: "/",
    });

    response.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[login]", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
