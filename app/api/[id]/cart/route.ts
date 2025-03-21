/* eslint-disable @typescript-eslint/no-explicit-any */

import Cart from "@/core/schema/Cart";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET(req: any) {
  try {
    await connectDB();
    const userId = req.nextUrl.pathname.split("/")[2];
    const cart = await Cart.findOne({ userId: userId })
      .populate("items.productId")
      .lean();

    const modifiedCart = {
      ...cart,
      items: (cart as any)?.items.map((item: any) => ({
        productId: item.productId._id,
        product: item.productId,
        quantity: item.quantity,
      })),
    };

    return NextResponse.json(
      { message: "✅ Lấy thông tin giỏ hàng", cart: modifiedCart },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
export async function DELETE(req: any) {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const body = await req.json();
    const { productId } = body;

    if (!token) {
      return NextResponse.json({ message: "Chưa đăng nhập" }, { status: 401 });
    }
    const user = verifyToken(token);

    // Tìm giỏ hàng của user
    const cart = await Cart.findOne({ userId: user._id });

    if (!cart) {
      return NextResponse.json(
        { message: "Giỏ hàng không tồn tại" },
        { status: 404 }
      );
    }

    // Lọc bỏ sản phẩm có productId khỏi danh sách items
    cart.items = cart.items.filter(
      (item: any) => item.productId.toString() !== productId
    );

    // Lưu lại giỏ hàng đã cập nhật
    await cart.save();

    return NextResponse.json({ message: "✅ Đã xóa", cart }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

export async function PUT(req: any) {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const body = await req.json();
    const { productId, quantity } = body;

    if (!token) {
      return NextResponse.json({ message: "Chưa đăng nhập" }, { status: 401 });
    }
    const user = verifyToken(token);

    // Tìm giỏ hàng của user
    const cart = await Cart.findOne({ userId: user._id });

    if (!cart) {
      return NextResponse.json(
        { message: "Giỏ hàng không tồn tại" },
        { status: 404 }
      );
    }

    const itemIndex = cart.items.findIndex(
      (item: any) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      return NextResponse.json(
        { message: "Sửa giỏ hàng hoàn tất", cart },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "❌ Không tìm thấy sản phẩm" },
      { status: 404 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
