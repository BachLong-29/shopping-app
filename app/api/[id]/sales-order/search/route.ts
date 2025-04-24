import { NextResponse } from "next/server";
import SalesOrder from "@/core/schema/SalesOrder";
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
          { name: { $regex: search, $options: "i" } }, // Tìm kiếm theo tên (không phân biệt chữ hoa/thường)
          { description: { $regex: search, $options: "i" } }, // Tìm kiếm theo mô tả
        ],
      }
    : {};

  // Điều kiện lọc sản phẩm theo ownerId và search
  const filter = {
    user: new mongoose.Types.ObjectId(stringId),
    ...searchFilter,
  };

  const total = await SalesOrder.countDocuments(filter);

  const salesOrders = await SalesOrder.find(filter) // Lấy sản phẩm của user
    .skip(skip) // Bỏ qua số sản phẩm theo offset
    .limit(take); // Giới hạn số sản phẩm theo limit

  return NextResponse.json({
    message: "✅ Lấy thành công danh sách đơn hàng!",
    data: salesOrders,
    total,
  });
}
