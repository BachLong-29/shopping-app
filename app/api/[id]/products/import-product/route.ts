import { NextResponse } from "next/server";
import Product from "@/core/schema/Product";
import { connectDB } from "@/lib/mongodb";
import { parse } from "papaparse";

export async function POST(req: Request) {
  try {
    await connectDB(); // Kết nối MongoDB

    // Đọc file từ form-data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "⚠️ Vui lòng chọn file CSV!" },
        { status: 400 }
      );
    }

    // Đọc nội dung file CSV
    const fileData = await file.text();

    // Parse CSV thành JSON
    const { data } = parse(fileData, {
      header: true, // Tự động lấy hàng đầu tiên làm header
      skipEmptyLines: true, // Bỏ qua dòng trống
    });

    // Chuyển đổi dữ liệu về đúng kiểu
    const products = data.map((item: any) => ({
      name: item.name,
      price: parseFloat(item.price),
      image: item.image,
      status: item.status,
      description: item.description,
      quantity: parseInt(item.quantity, 10),
      ownerId: item.ownerId, // Nếu cần lưu theo user
      category: item.category,
      //   seller: item.ownerId,
    }));

    // Lưu vào database
    await Product.insertMany(products);

    return NextResponse.json({
      message: "✅ Import sản phẩm thành công!",
      count: products.length,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "❌ Lỗi khi import CSV", error },
      { status: 500 }
    );
  }
}
