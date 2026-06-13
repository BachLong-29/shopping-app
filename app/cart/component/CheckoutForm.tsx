"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  User,
  CreditCard,
  Truck,
  Banknote,
  Loader2,
  Package,
} from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store/store";
import { formatNumber } from "@/core/utils/format";
import { defaultAvatar } from "@/core/utils/common";
import { Card } from "@/components/design-system/Card";
import { Button } from "@/components/design-system/Button";
import { Input } from "@/components/design-system/Input";
import { Radio } from "@/components/design-system/Checkbox";

import paymentService from "@/core/services/paymentService";
import { useCartContext, ShippingAddress } from "../context/CartContext";

const SHIPPING_FEE = 30_000;

const CheckoutForm = () => {
  const { cart, selectedItems, setCheckoutStep, setOrderResults, setShippingAddress } =
    useCartContext();
  const profile = useSelector((state: RootState) => state.profile);
  const userId = useSelector((state: RootState) => state.profile._id);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ShippingAddress>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postal: "",
    country: "Việt Nam",
    paymentMethod: "cod",
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      name: profile.name ?? "",
      phone: profile.phone ?? "",
      email: profile.email ?? "",
      address: profile.address ?? "",
      city: profile.city ?? "",
      state: profile.state ?? "",
      postal: profile.postal ?? "",
      country: profile.country || "Việt Nam",
    }));
  }, [profile]);

  const field =
    (key: keyof ShippingAddress) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const selectedShops = cart
    .map((shop) => ({
      ...shop,
      products: shop.products.filter((p) => selectedItems.has(p._id)),
    }))
    .filter((shop) => shop.products.length > 0);

  const subtotal = selectedShops.reduce(
    (acc, shop) =>
      acc + shop.products.reduce((s, p) => s + p.price * p.purchaseQuantity, 0),
    0
  );
  const shippingTotal = selectedShops.length * SHIPPING_FEE;
  const total = subtotal + shippingTotal;

  const isFormValid =
    form.name.trim() &&
    form.phone.trim() &&
    form.address.trim() &&
    form.city.trim();

  const handlePlaceOrder = async () => {
    if (!isFormValid || loading) return;
    setLoading(true);
    setShippingAddress(form);

    try {
      const results = await Promise.all(
        selectedShops.map((shop) =>
          paymentService.checkout({
            userId,
            amount:
              shop.products.reduce(
                (acc, p) => acc + p.price * p.purchaseQuantity,
                0
              ) + SHIPPING_FEE,
            sellerId: shop.shop.id,
            products: shop.products.map((p) => ({
              product: p._id,
              quantity: p.purchaseQuantity,
            })),
            shippingAddress: form,
          })
        )
      );

      setOrderResults(
        results.map((res, i) => ({
          orderId: res?.order?._id ?? res?.transactionId ?? `ORD-${Date.now()}-${i}`,
          transactionId: res?.transactionId,
          totalAmount:
            selectedShops[i].products.reduce(
              (acc, p) => acc + p.price * p.purchaseQuantity,
              0
            ) + SHIPPING_FEE,
          shopName: selectedShops[i].shop.name,
        }))
      );
      setCheckoutStep("success");
    } catch (err) {
      console.error("Checkout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => setCheckoutStep("cart")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Quay lại giỏ hàng
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form — left */}
        <div className="lg:col-span-3 space-y-5">
          {/* Delivery info */}
          <Card padded>
            <h2 className="font-bold text-base mb-5 flex items-center gap-2">
              <MapPin size={18} className="text-halo-violet" />
              Thông tin nhận hàng
            </h2>
            <div className="space-y-4">
              <Input
                label="Họ và tên"
                required
                placeholder="Nguyễn Văn A"
                value={form.name}
                onChange={field("name")}
                leftIcon={<User size={15} />}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Số điện thoại"
                  required
                  placeholder="0901234567"
                  value={form.phone}
                  onChange={field("phone")}
                  leftIcon={<Phone size={15} />}
                />
                <Input
                  label="Email"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={field("email")}
                  leftIcon={<Mail size={15} />}
                />
              </div>
              <Input
                label="Địa chỉ"
                required
                placeholder="Số nhà, tên đường..."
                value={form.address}
                onChange={field("address")}
                leftIcon={<MapPin size={15} />}
              />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-2">
                  <Input
                    label="Thành phố"
                    required
                    placeholder="Hồ Chí Minh"
                    value={form.city}
                    onChange={field("city")}
                  />
                </div>
                <Input
                  label="Tỉnh / Bang"
                  placeholder="—"
                  value={form.state}
                  onChange={field("state")}
                />
                <Input
                  label="Bưu điện"
                  placeholder="70000"
                  value={form.postal}
                  onChange={field("postal")}
                />
              </div>
              <Input
                label="Quốc gia"
                placeholder="Việt Nam"
                value={form.country}
                onChange={field("country")}
              />
            </div>
          </Card>

          {/* Payment method */}
          <Card padded>
            <h2 className="font-bold text-base mb-5 flex items-center gap-2">
              <CreditCard size={18} className="text-halo-violet" />
              Phương thức thanh toán
            </h2>
            <div className="space-y-3">
              <label
                className={`flex items-center gap-4 p-4 rounded-[14px] border-2 cursor-pointer transition-all ${
                  form.paymentMethod === "cod"
                    ? "border-halo-violet bg-halo-violet/5"
                    : "border-border hover:border-border/80"
                }`}
              >
                <Radio
                  name="paymentMethod"
                  value="cod"
                  checked={form.paymentMethod === "cod"}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, paymentMethod: "cod" }))
                  }
                />
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-halo-amber/15 flex items-center justify-center">
                    <Truck size={18} className="text-halo-amber" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Thanh toán khi nhận hàng</p>
                    <p className="text-xs text-muted-foreground">
                      COD — Trả tiền mặt khi giao đến
                    </p>
                  </div>
                </div>
              </label>

              <label
                className={`flex items-center gap-4 p-4 rounded-[14px] border-2 cursor-pointer transition-all ${
                  form.paymentMethod === "transfer"
                    ? "border-halo-violet bg-halo-violet/5"
                    : "border-border hover:border-border/80"
                }`}
              >
                <Radio
                  name="paymentMethod"
                  value="transfer"
                  checked={form.paymentMethod === "transfer"}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, paymentMethod: "transfer" }))
                  }
                />
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-halo-emerald/15 flex items-center justify-center">
                    <Banknote size={18} className="text-halo-emerald" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Chuyển khoản ngân hàng</p>
                    <p className="text-xs text-muted-foreground">
                      Thanh toán qua Internet Banking / QR Pay
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </Card>
        </div>

        {/* Order recap — right */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden">
            <div className="px-5 py-4 border-b border-border/60 bg-muted/20">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Package size={15} className="text-halo-violet" />
                Đơn hàng của bạn
              </h3>
            </div>
            <div className="divide-y divide-border/40">
              {selectedShops.map((shop) => (
                <div key={shop.shop.id} className="px-5 py-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Image
                      width={18}
                      height={18}
                      src={shop.shop.avatar || defaultAvatar}
                      alt={shop.shop.name}
                      className="w-[18px] h-[18px] rounded-full border border-border"
                    />
                    <span className="text-xs font-semibold text-muted-foreground">
                      {shop.shop.name}
                    </span>
                  </div>
                  {shop.products.map((p) => (
                    <div key={p._id} className="flex gap-2 items-start">
                      <div className="w-9 h-9 rounded-[8px] overflow-hidden bg-muted shrink-0">
                        <Image
                          width={36}
                          height={36}
                          src={(p.images ?? [])[0] ?? defaultAvatar}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs line-clamp-2 leading-snug">
                          {p.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ×{p.purchaseQuantity}
                        </p>
                      </div>
                      <span className="text-xs font-semibold shrink-0">
                        {formatNumber(p.price * p.purchaseQuantity)}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="px-5 py-4 bg-muted/20 border-t border-border/60 space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Tạm tính</span>
                <span>{formatNumber(subtotal)} VND</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Phí vận chuyển</span>
                <span>{formatNumber(shippingTotal)} VND</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-border/60">
                <span>Tổng cộng</span>
                <span className="text-halo-violet">
                  {formatNumber(total)} VND
                </span>
              </div>
            </div>
          </Card>

          <Button
            variant="gradient"
            size="lg"
            className="w-full"
            disabled={!isFormValid || loading}
            onClick={handlePlaceOrder}
            loading={loading}
          >
            {loading ? "Đang xử lý..." : "Xác nhận đặt hàng"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Bằng cách đặt hàng, bạn đồng ý với{" "}
            <span className="text-halo-violet cursor-pointer hover:underline">
              điều khoản dịch vụ
            </span>{" "}
            của chúng tôi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
