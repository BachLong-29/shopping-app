/* eslint-disable @typescript-eslint/no-explicit-any */

import Cart from "@/core/schema/Cart";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET(req: any) {
  try {
    await connectDB();
    const userId = req.nextUrl.pathname.split("/")[2];
    console.log("req.nextUrl.pathname", req.nextUrl.pathname);
    const cart = await Cart.findOne({ userId: userId });
    console.log({ userId });
    console.log({ cart });
    const totalItems = cart.items.length;
    const productIds = cart.items.map((item: any) => item.productId);
    return NextResponse.json(
      {
        message: "✅ Số lượng sản phẩm trong giỏ hàng",
        total: totalItems,
        productIds,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
