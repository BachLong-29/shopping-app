import { NextResponse } from "next/server";
import Product from "@/core/model/Product";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  await connectDB(); // Kết nối DB trước khi truy vấn

  const products = await Product.find().populate("category"); // Lấy dữ liệu kèm category

  return NextResponse.json({ message: "✅ Kết nối thành công!", products });
}

// export async function POST(req: Request) {
//   await connectDB();

//   const session = await getSession({ req });
//   if (!session || session.user.role !== "seller") {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
//   }

//   try {
//     const body = await req.json();
//     const { name, price, category, description } = body;
//     const newProduct = new Product({
//       name,
//       price,
//       category,
//       seller: session.user.id, // Gán seller là user hiện tại
//       description,
//     });

//     await newProduct.save();
//     return NextResponse.json({
//       message: "Sản phẩm đã được tạo",
//       product: newProduct,
//     });
//   } catch (error) {
//     return NextResponse.json({ message: "Lỗi server", error }, { status: 500 });
//   }
// }
