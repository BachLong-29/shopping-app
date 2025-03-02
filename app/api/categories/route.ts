import Category from "@/core/model/Category";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: any) {
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
