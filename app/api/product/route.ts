import { NextResponse } from "next/server";
import Product from "@/core/schema/Product";
import { connectDB } from "@/lib/mongodb";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: any) {
  try {
    await connectDB(); // Kết nối DB trước khi truy vấn

    const { searchParams } = new URL(req.url);
    // Lấy các query params
    const category = searchParams.get("category");
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || Number.MAX_VALUE;
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const order = searchParams.get("order") === "desc" ? -1 : 1;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;
    const skip = (page - 1) * limit;

    // Query database lấy danh sách sản phẩm
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = { price: { $gte: minPrice, $lte: maxPrice } };
    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
