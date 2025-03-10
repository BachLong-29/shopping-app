import { NextResponse } from "next/server";
import Product from "@/core/schema/Product";
import { connectDB } from "@/lib/mongodb";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: any) {
  await connectDB(); // Kết nối DB trước khi truy vấn
  const { offset, limit } = await req.json();
  const id = req.nextUrl.pathname.split("/")[2];

  const skip = offset || 0; // Nếu không có offset thì mặc định là 0
  const take = limit || 10; // Nếu không có limit thì mặc định lấy 10 sản phẩm

  const total = await Product.countDocuments({ ownerId: id });

  const products = await Product.find({ ownerId: id }) // Lấy sản phẩm của user
    .skip(skip) // Bỏ qua số sản phẩm theo offset
    .limit(take); // Giới hạn số sản phẩm theo limit

  return NextResponse.json({
    message: "✅ Lấy thành công danh sách sản phẩm!",
    products,
    total,
  });
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
