import { NextResponse } from "next/server";
import Product from "@/core/schema/Product";
import { ProductStatus } from "@/core/model/Product";
import { connectDB } from "@/lib/mongodb";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: any) {
  await connectDB();
  try {
    const body = await req.json();
    const id = req.nextUrl.pathname.split("/")[2];
    console.log("req.nextUrl", id);
    const { name, price, category, description, quantity } = body;
    const newProduct = new Product({
      name,
      price,
      category,
      ownerId: id,
      description,
      quantity,
      status: ProductStatus.Available,
    });

    await newProduct.save();
    return NextResponse.json({
      message: "Sản phẩm đã được tạo",
      product: newProduct,
    });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server", error }, { status: 500 });
  }
}
