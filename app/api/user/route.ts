import { NextResponse } from "next/server";
import User from "@/core/schema/User";
import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth"; // Hàm verify token

export async function GET() {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id).select("-password"); // Ẩn password

    if (!user)
      return NextResponse.json(
        { error: "Không tìm thấy người dùng" },
        { status: 404 }
      );

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = verifyToken(token);
    const { address, gender, birthdate } = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      {
        // avatar,
        address,
        gender,
        birthdate: birthdate ? new Date(birthdate) : null,
      },
      { new: true }
    ).select("-password");

    return NextResponse.json(
      {
        user: updatedUser,
        status: "success",
        message: "Chỉnh sửa thông tin người dùng thành công",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
