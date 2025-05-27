import { $FixType } from "@/core/types/FixType";
import Cart from "@/core/schema/Cart";
import { NextResponse } from "next/server";
import PurchaseOrder from "@/core/schema/PurchaseOrder";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: any) {
  try {
    const orderId = req.nextUrl.pathname.split("/")[4];
    const userId = req.nextUrl.pathname.split("/")[2];

    if (!orderId) {
      return NextResponse.json({ message: "Thiếu orderId" }, { status: 400 });
    }

    const order = await PurchaseOrder.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { message: "Đơn hàng không tồn tại" },
        { status: 404 }
      );
    }

    if (order.status !== "draft") {
      return NextResponse.json(
        { message: "Đơn hàng không thể thanh toán" },
        { status: 400 }
      );
    }

    // Giả lập xử lý thanh toán
    const isSuccess = Math.random() > 0.2; // 80% thành công
    if (isSuccess) {
      // Cập nhật trạng thái đơn hàng
      order.status = "completed";

      order.save();

      const products = order.products.map((p: $FixType) => p.product);
      console.log("userId", userId);
      console.log("products", products);
      const cart = await Cart.findOne({ userId });
      console.log("🛒 Cart found:", cart);
      await Cart.updateOne(
        { userId },
        {
          $pull: {
            items: {
              productId: {
                $in: products,
              },
            },
          },
        }
      );

      return NextResponse.json({
        status: "success",
        transactionId: `txn_${Math.floor(Math.random() * 100000)}`,
        order,
      });
    } else {
      return NextResponse.json(
        { status: "failed", message: "Thanh toán thất bại" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server", error }, { status: 500 });
  }
}
