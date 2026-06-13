import { NextResponse } from "next/server";
import PurchaseOrder from "@/core/schema/PurchaseOrder";
import SalesOrder from "@/core/schema/SalesOrder";
import { connectDB } from "@/lib/mongodb";
import paymentService from "@/core/services/paymentService";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: any) {
  try {
    await connectDB();

    const body = await req.json();
    const { amount, currency, products, sellerId, shippingAddress, paymentMethod } = body;
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
      user: sellerId,
      products,
    });
    await newOrder.save();

    const newPurchaseOrder = new PurchaseOrder({
      status: "pending",
      totalAmount: amount,
      currency,
      seller: userId,
      products,
      shippingAddress,
      paymentMethod: paymentMethod ?? "cod",
    });
    await newPurchaseOrder.save();

    const paymentResponse = await paymentService.payment({
      userId,
      orderId: newOrder._id,
    });

    if (paymentResponse.status === "success") {
      return NextResponse.json({
        message: "Đơn hàng đã được thanh toán thành công",
        order: paymentResponse.order,
        transactionId: paymentResponse.transactionId,
        purchaseOrderId: newPurchaseOrder._id,
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
