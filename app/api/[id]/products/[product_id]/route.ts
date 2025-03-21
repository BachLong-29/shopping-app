import { NextResponse } from "next/server";
import Product from "@/core/schema/Product";
import { connectDB } from "@/lib/mongodb";
import { isEmpty } from "lodash";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(req: any) {
  try {
    await connectDB();

    const id = req.nextUrl.pathname.split("/")[4];

    if (!id) {
      return NextResponse.json(
        { message: "Thiếu id sản phẩm!" },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Không tìm thấy sản phẩm!" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "✅ Xóa sản phẩm thành công!",
      deletedProduct,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Lỗi server!" }, { status: 500 });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: any) {
  try {
    await connectDB();

    const productId = req.nextUrl.pathname.split("/")[4];

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { message: "Không tìm  thấy sản phẩm" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "✅ Lấy chi tiết sản phẩm", product },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(req: any) {
  try {
    await connectDB();

    const productId = req.nextUrl.pathname.split("/")[4];

    const product = await Product.findById(productId);
    const body = await req.json();
    const { name, price, category, description, quantity, images } = body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name: name ? name : product.name,
        price: price ? price : product.price,
        category: category ? category : product.category,
        description: description ? description : product.description,
        quantity: quantity ? quantity : product.quantity,
        images: !isEmpty(images) ? images : product.images,
      },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "✅ Chỉnh sửa thành công thông tin sản phẩm",
        product: updatedProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
