import { NextResponse } from "next/server";
import { Parser } from "json2csv";
import Product from "@/core/schema/Product";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  await connectDB();

  // export từ những id mà user chọn.
  // export theo trang user đang chọn hoặc search. limit, offset, search, filter, sort.
  // export all
  const products = await Product.find();

  if (!products.length) {
    return NextResponse.json(
      { message: "Không có sản phẩm nào để xuất!" },
      { status: 400 }
    );
  }

  const fields = [
    "id",
    "name",
    "price",
    "image",
    "status",
    "description",
    "quantity",
  ];
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(products);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=products.csv",
    },
  });
}
