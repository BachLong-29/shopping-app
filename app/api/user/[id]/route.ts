import { NextResponse } from "next/server";
import User from "@/core/schema/User";
import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: any) {
  try {
    await connectDB();
    // const cookieStore = await cookies();
    // const token = cookieStore.get("token")?.value;

    // if (!token)
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = req.nextUrl.pathname.split("/").pop();
    const user = await User.findById(id).select("-password");
    if (!user)
      return NextResponse.json(
        { error: "Không tìm thấy người dùng" },
        { status: 404 }
      );

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(req: any) {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = req.nextUrl.pathname.split("/").pop();
    const { address, gender, birthdate, phone } = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        // avatar,
        phone,
        address,
        gender,
        birthdate,
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
