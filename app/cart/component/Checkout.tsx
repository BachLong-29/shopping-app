"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Tag, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RootState } from "@/redux/store/store";
import { Separator } from "@/components/ui/separator";
import paymentService from "@/core/services/paymentService";
import { useCartContext } from "../context/CartContext";
import { useSelector } from "react-redux";
import { useState } from "react";

const Checkout = () => {
  const [coupon, setCoupon] = useState("");
  const [shippingFee] = useState(30000);
  const { cart, selectedShop } = useCartContext();
  const userId = useSelector((state: RootState) => state.profile._id);

  const selectedShopData = cart.find((item) => item.shop.id === selectedShop);
  const subtotal =
    selectedShopData?.products.reduce(
      (acc, p) => acc + p.price * p.purchaseQuantity,
      0
    ) || 0;
  const total = subtotal + shippingFee;
  console.log(selectedShop);
  const handlePayment = async () => {
    const res = await paymentService.checkout({
      userId,
      amount: total,
      products:
        selectedShopData?.products.map((item) => ({
          product: item._id,
          quantity: item.purchaseQuantity,
        })) ?? [],
      sellerId: selectedShop,
    });
    console.log({ res });
  };
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Thanh toán</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Coupon */}
        <div className="flex items-center gap-2">
          <Tag size={20} />
          <Input
            placeholder="Nhập mã giảm giá"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <Button variant="outline">Áp dụng</Button>
        </div>

        {/* Phí vận chuyển */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck size={20} />
            <span>Phí vận chuyển:</span>
          </div>
          <span>{shippingFee.toLocaleString()} VND</span>
        </div>

        <Separator />

        {/* Tổng thanh toán */}
        <div className="flex justify-between text-lg font-semibold">
          <span>Tổng tiền:</span>
          <span>{total.toLocaleString()} VND</span>
        </div>

        <Button
          className="w-full"
          disabled={!selectedShop}
          onClick={handlePayment}
        >
          <ShoppingCart size={20} className="mr-2" />
          Thanh toán
          {/* {selectedShop} */}
        </Button>
      </CardContent>
    </Card>
  );
};

export default Checkout;
