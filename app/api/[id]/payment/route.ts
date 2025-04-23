import { $FixType } from "@/core/types/FixType";
import Cart from "@/core/schema/Cart";
import { NextResponse } from "next/server";
import SalesOrder from "@/core/schema/SalesOrder";
import { connectDB } from "@/lib/mongodb";
import paymentService from "@/core/services/paymentService";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: any) {
  try {
    await connectDB();

    const body = await req.json();
    const { amount, currency, products } = body;
    const userId = req.nextUrl.pathname.split("/")[2];
    if (!amount || !currency) {
      return NextResponse.json(
        { message: "Thiếu dữ liệu thanh toán" },
        { status: 400 }
      );
    }

    const newOrder = new SalesOrder({
      status: "draft",
      totalAmount: amount,
      currency,
      user: userId,
      products,
    });
    await newOrder.save();
    // console.log("📝 Đơn hàng đã tạo:", newOrder);

    // 🔹 Gọi API thanh toán
    const paymentResponse = await paymentService.payment({
      userId,
      orderId: newOrder._id,
    });
    // console.log("💳 Kết quả thanh toán:", paymentResponse);

    if (paymentResponse.status === "success") {
      return NextResponse.json({
        message: "Đơn hàng đã được thanh toán thành công",
        order: paymentResponse.order,
        transactionId: paymentResponse.transactionId,
      });
    } else {
      return NextResponse.json(
        {
          message: "Thanh toán thất bại",
          reason: paymentResponse.message,
          order: newOrder,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server", error }, { status: 500 });
  }
}
