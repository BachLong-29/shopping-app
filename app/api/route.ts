import { NextResponse } from "next/server";
import Product from "@/core/schema/Product";
import { connectDB } from "../../lib/mongodb";

export async function GET() {
  await connectDB(); // Kết nối DB trước khi truy vấn

  const products = await Product.find().populate("category"); // Lấy dữ liệu kèm category

  return NextResponse.json({ message: "✅ Kết nối thành công!", products });
}
