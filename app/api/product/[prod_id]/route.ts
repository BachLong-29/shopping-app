import { NextResponse } from "next/server";
import Product from "@/core/schema/Product";
import { connectDB } from "@/lib/mongodb";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: any) {
  try {
    await connectDB();

    const productId = req.nextUrl.pathname.split("/")[3];
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { message: "Không tìm  thấy sản phẩm" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "✅ Lấy chi tiết sản phẩm", product },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
