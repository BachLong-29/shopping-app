import { NextResponse } from "next/server";
import User from "@/core/schema/User";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: any) {
  await connectDB();
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email đã tồn tại" },
        { status: 400 }
      );
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();

    return NextResponse.json({ message: "Đăng ký thành công" });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server", error }, { status: 500 });
  }
}
