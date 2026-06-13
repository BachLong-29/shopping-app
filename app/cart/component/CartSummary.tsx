"use client";

import { ShoppingBag, Truck, ChevronRight, Package } from "lucide-react";
import { Card } from "@/components/design-system/Card";
import { Button } from "@/components/design-system/Button";
import { formatNumber } from "@/core/utils/format";
import { defaultAvatar } from "@/core/utils/common";
import { isEmpty } from "lodash";
import Image from "next/image";

import { useCartContext } from "../context/CartContext";

const SHIPPING_FEE = 30_000;

const CartSummary = () => {
  const { cart, selectedItems, setCheckoutStep, currentUserId } =
    useCartContext();

  const selectedShops = cart
    // Never include the user's own shop in checkout
    .filter((shop) => shop.shop.id !== currentUserId)
    .map((shop) => ({
      ...shop,
      products: shop.products.filter((p) => selectedItems.has(p._id)),
    }))
    .filter((shop) => shop.products.length > 0);

  const subtotal = selectedShops.reduce(
    (acc, shop) =>
      acc +
      shop.products.reduce((s, p) => s + p.price * p.purchaseQuantity, 0),
    0
  );
  const shippingTotal = selectedShops.length * SHIPPING_FEE;
  const total = subtotal + shippingTotal;
  const selectedCount = selectedItems.size;

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-border/60 bg-muted/20">
          <div className="flex items-center gap-2">
            <ShoppingBag size={16} className="text-halo-violet" />
            <span className="font-semibold text-sm">
              Tóm tắt đơn hàng
            </span>
            {selectedCount > 0 && (
              <span className="ml-auto text-xs bg-halo-violet text-white rounded-full px-2 py-0.5 font-medium">
                {selectedCount}
              </span>
            )}
          </div>
        </div>

        {selectedShops.length === 0 ? (
          <div className="px-5 py-8 text-center text-muted-foreground text-sm">
            <Package size={32} className="mx-auto mb-2 opacity-30" />
            <p>Chưa chọn sản phẩm nào</p>
            <p className="text-xs mt-1">Chọn sản phẩm từ giỏ hàng để tiếp tục</p>
          </div>
        ) : (
          <div className="divide-y divide-border/40">
            {selectedShops.map((shop) => {
              const shopSubtotal = shop.products.reduce(
                (acc, p) => acc + p.price * p.purchaseQuantity,
                0
              );
              return (
                <div key={shop.shop.id} className="px-5 py-4 space-y-3">
                  {/* Shop name */}
                  <div className="flex items-center gap-2">
                    <Image
                      width={20}
                      height={20}
                      src={
                        !isEmpty(shop.shop.avatar)
                          ? shop.shop.avatar
                          : defaultAvatar
                      }
                      alt={shop.shop.name}
                      className="w-5 h-5 rounded-full object-cover border border-border"
                    />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {shop.shop.name}
                    </span>
                  </div>

                  {/* Products */}
                  <div className="space-y-2">
                    {shop.products.map((p) => (
                      <div
                        key={p._id}
                        className="flex items-center gap-2 text-xs"
                      >
                        <div className="w-8 h-8 rounded-[6px] overflow-hidden bg-muted shrink-0 border border-border/50">
                          <Image
                            width={32}
                            height={32}
                            src={(p.images ?? [])[0] ?? defaultAvatar}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="flex-1 line-clamp-1 text-foreground/80">
                          {p.name}
                          <span className="text-muted-foreground ml-1">
                            ×{p.purchaseQuantity}
                          </span>
                        </span>
                        <span className="font-medium shrink-0">
                          {formatNumber(p.price * p.purchaseQuantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Shop shipping */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                    <span className="flex items-center gap-1">
                      <Truck size={11} />
                      Phí vận chuyển
                    </span>
                    <span>{formatNumber(SHIPPING_FEE)} VND</span>
                  </div>

                  {/* Shop subtotal */}
                  <div className="flex justify-between text-sm font-medium">
                    <span>Tạm tính shop</span>
                    <span>{formatNumber(shopSubtotal + SHIPPING_FEE)} VND</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Total */}
        {selectedShops.length > 0 && (
          <div className="px-5 py-4 bg-muted/30 border-t border-border/60 space-y-3">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Tạm tính ({selectedCount} SP)</span>
              <span>{formatNumber(subtotal)} VND</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Phí vận chuyển ({selectedShops.length} shop)</span>
              <span>{formatNumber(shippingTotal)} VND</span>
            </div>
            <div className="flex justify-between text-base font-bold border-t border-border/60 pt-3">
              <span>Tổng cộng</span>
              <span className="text-halo-violet">
                {formatNumber(total)} VND
              </span>
            </div>
          </div>
        )}
      </Card>

      {/* Checkout button */}
      <Button
        variant="gradient"
        size="lg"
        className="w-full"
        disabled={selectedCount === 0}
        onClick={() => setCheckoutStep("checkout")}
      >
        Tiến hành thanh toán
        <ChevronRight size={18} />
      </Button>

      {selectedCount > 0 && (
        <p className="text-center text-xs text-muted-foreground">
          {selectedCount} sản phẩm · Tổng{" "}
          <span className="font-semibold text-foreground">
            {formatNumber(total)} VND
          </span>
        </p>
      )}
    </div>
  );
};

export default CartSummary;
