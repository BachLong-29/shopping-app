import { NextRequest, NextResponse } from "next/server";

import Category from "@/core/schema/Category";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const body = await req.json();
    console.log("📌 Dữ liệu nhận từ request:", body); // Debug

    const { name, slug, description } = body;
    const newCategory = new Category({ name, slug, description });
    await newCategory.save();

    console.log("✅ Lưu thành công:", newCategory); // Debug

    return NextResponse.json({
      message: "Danh mục đã được tạo",
      category: newCategory,
    });
  } catch (error) {
    console.error("❌ Lỗi server:", error); // Debug lỗi nếu có
    return NextResponse.json({ message: "Lỗi server", error });
  }
}

export async function GET() {
  await connectDB(); // Kết nối DB trước khi truy vấn

  const category = await Category.find(); // Lấy dữ liệu kèm category

  return NextResponse.json({ message: "✅ Kết nối thành công!", category });
}
