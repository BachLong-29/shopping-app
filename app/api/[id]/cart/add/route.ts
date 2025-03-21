/* eslint-disable @typescript-eslint/no-explicit-any */

import Cart from "@/core/schema/Cart";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function POST(req: any) {
  try {
    await connectDB();
    const body = await req.json();
    const { productId, quantity } = body;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Chưa đăng nhập" }, { status: 401 });
    }

    const user = verifyToken(token);

    let cart = await Cart.findOne({ userId: user._id });

    if (!cart) {
      cart = new Cart({ userId: user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item: any) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    return NextResponse.json(
      { message: "✅ Lấy chi tiết sản phẩm", cart },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
