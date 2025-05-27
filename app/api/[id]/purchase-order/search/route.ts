import { NextResponse } from "next/server";
import PurchaseOrder from "@/core/schema/PurchaseOrder";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: any) {
  await connectDB(); // Kết nối DB trước khi truy vấn
  const { offset, limit, search } = await req.json();
  const id = req.nextUrl.pathname.split("/")[2];
  const stringId = String(id);

  if (!mongoose.Types.ObjectId.isValid(stringId)) {
    return NextResponse.json({ message: "ID không hợp lệ" }, { status: 400 });
  }

  const skip = offset || 0; // Nếu không có offset thì mặc định là 0
  const take = limit || 10; // Nếu không có limit thì mặc định lấy 10 sản phẩm

  // Điều kiện tìm kiếm
  const searchFilter = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  // Điều kiện lọc sản phẩm theo ownerId và search
  const filter = {
    seller: new mongoose.Types.ObjectId(stringId),
    ...searchFilter,
  };

  const total = await PurchaseOrder.countDocuments(filter);

  const purchaseOrders = await PurchaseOrder.find(filter) // Lấy sản phẩm của user
    .skip(skip) // Bỏ qua số sản phẩm theo offset
    .limit(take); // Giới hạn số sản phẩm theo limit
  console.log("purchaseOrders", purchaseOrders);
  return NextResponse.json({
    message: "✅ Lấy thành công danh sách đơn hàng!",
    data: purchaseOrders,
    total,
  });
}
