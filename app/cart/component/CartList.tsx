"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Store } from "lucide-react";
import { debounce, isEmpty } from "lodash";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store/store";
import { removeFromCart } from "@/redux/reducer/cartReducer";
import { defaultAvatar } from "@/core/utils/common";
import { formatNumber } from "@/core/utils/format";
import { Card } from "@/components/design-system/Card";
import { Button, IconButton } from "@/components/design-system/Button";
import { Checkbox } from "@/components/design-system/Checkbox";
import { EmptyState } from "@/components/design-system/EmptyState";
import { Confirmation } from "@/components/layout/custom/Confirmation";

import cartService from "../services/cartServices";
import { useCartContext } from "../context/CartContext";
import { useLanguage } from "@/core/context/LanguageContext";

const CartList = () => {
  const { cart, setCart, selectedItems, setSelectedItems, currentUserId } =
    useCartContext();
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.profile._id);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateCartDebounced = useCallback(
    debounce((productId: string, quantity: number) => {
      cartService.updateCart({ userId, productId, quantity });
    }, 500),
    [userId]
  );

  const handleRemoveFromCart = (productId: string) => {
    cartService.removeFromCart({ userId, productId }).then(() => {
      dispatch(removeFromCart(productId));
      setSelectedItems((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    });
  };

  const updateQuantity = (shopId: string, productId: string, delta: number) => {
    let finalQuantity = 0;
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.shop.id !== shopId) return item;
          return {
            ...item,
            products: item.products
              .map((p) => {
                if (p._id !== productId) return p;
                const next = Math.max(0, p.purchaseQuantity + delta);
                finalQuantity = next;
                return { ...p, purchaseQuantity: next };
              })
              .filter((p) => p.purchaseQuantity > 0),
          };
        })
        .filter((shop) => shop.products.length > 0)
    );
    if (finalQuantity > 0) updateCartDebounced(productId, finalQuantity);
  };

  const isProductSelected = (productId: string) =>
    selectedItems.has(productId);

  const isShopFullySelected = (shopId: string) => {
    const shop = cart.find((s) => s.shop.id === shopId);
    if (!shop || shop.products.length === 0) return false;
    return shop.products.every((p) => selectedItems.has(p._id));
  };

  const isShopPartiallySelected = (shopId: string) => {
    const shop = cart.find((s) => s.shop.id === shopId);
    if (!shop) return false;
    const count = shop.products.filter((p) => selectedItems.has(p._id)).length;
    return count > 0 && count < shop.products.length;
  };

  const isOwnShop = (shopId: string) => shopId === currentUserId;

  const toggleShop = (shopId: string) => {
    if (isOwnShop(shopId)) return;
    const shop = cart.find((s) => s.shop.id === shopId);
    if (!shop) return;
    const allSelected = isShopFullySelected(shopId);
    setSelectedItems((prev) => {
      const next = new Set(prev);
      shop.products.forEach((p) => {
        if (allSelected) next.delete(p._id);
        else next.add(p._id);
      });
      return next;
    });
  };

  const toggleProduct = (productId: string, shopId: string) => {
    if (isOwnShop(shopId)) return;
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  };

  const toggleAll = () => {
    // Only include purchasable products (not from own shops)
    const allIds = cart
      .filter((s) => !isOwnShop(s.shop.id))
      .flatMap((s) => s.products.map((p) => p._id));
    const allSelected = allIds.every((id) => selectedItems.has(id));
    setSelectedItems(allSelected ? new Set() : new Set(allIds));
  };

  const purchasableShops = cart.filter((s) => !isOwnShop(s.shop.id));
  const totalProducts = purchasableShops.reduce(
    (acc, s) => acc + s.products.length,
    0
  );
  const allSelected =
    totalProducts > 0 &&
    purchasableShops
      .flatMap((s) => s.products.map((p) => p._id))
      .every((id) => selectedItems.has(id));

  if (cart.length === 0) {
    return (
      <div className="lg:col-span-2">
        <Card padded>
          <EmptyState
            icon={<Store size={32} />}
            title="Giỏ hàng trống"
            description="Chưa có sản phẩm nào trong giỏ. Hãy khám phá và thêm vào nhé!"
            action={
              <Link href="/">
                <Button variant="gradient" size="lg">
                  Khám phá sản phẩm
                </Button>
              </Link>
            }
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 space-y-4">
      {/* Global select all */}
      <div className="flex items-center gap-3 px-2">
        <Checkbox
          checked={allSelected}
          onChange={toggleAll}
          label={`Chọn tất cả (${totalProducts} sản phẩm)`}
          className="text-sm font-medium"
        />
      </div>

      {cart.map((item) => {
        const ownShop = isOwnShop(item.shop.id);
        const shopFullySelected = isShopFullySelected(item.shop.id);
        const shopPartial = isShopPartiallySelected(item.shop.id);

        return (
          <Card
            key={item.shop.id}
            className={cn("overflow-hidden", ownShop && "opacity-70")}
          >
            {/* Shop header */}
            <div
              className={cn(
                "flex items-center gap-3 px-5 py-4 border-b border-border/60",
                ownShop
                  ? "bg-halo-amber/10"
                  : "bg-muted/30"
              )}
            >
              <Checkbox
                checked={shopFullySelected}
                ref={(el) => {
                  if (el) el.indeterminate = shopPartial;
                }}
                onChange={() => toggleShop(item.shop.id)}
                disabled={ownShop}
              />
              <Link
                href={`/user/${item.shop.id}`}
                className="flex items-center gap-2.5 flex-1 group"
              >
                <div className="relative">
                  <Image
                    width={36}
                    height={36}
                    alt={item.shop.name}
                    src={
                      !isEmpty(item.shop.avatar)
                        ? item.shop.avatar
                        : defaultAvatar
                    }
                    className="w-9 h-9 rounded-full object-cover border-2 border-border"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-halo-emerald rounded-full border-2 border-card" />
                </div>
                <span className="font-semibold text-sm group-hover:text-halo-violet transition-colors">
                  {item.shop.name}
                </span>
                {ownShop && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-halo-amber/20 text-halo-amber border border-halo-amber/30">
                    Shop của bạn
                  </span>
                )}
              </Link>
              {ownShop ? (
                <span className="text-xs text-halo-amber font-medium">
                  Không thể tự mua
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">
                  {item.products.length} sản phẩm
                </span>
              )}
            </div>

            {/* Own-shop notice */}
            {ownShop && (
              <div className="px-5 py-3 bg-halo-amber/5 border-b border-halo-amber/20 flex items-center gap-2 text-xs text-halo-amber">
                <span>⚠️</span>
                Bạn không thể thanh toán sản phẩm do chính mình đăng bán.
              </div>
            )}

            {/* Products */}
            <div className="divide-y divide-border/40">
              {item.products.map((product) => {
                const selected = isProductSelected(product._id);
                return (
                  <div
                    key={product._id}
                    className={cn(
                      "flex items-center gap-4 px-5 py-4 transition-colors duration-150",
                      ownShop
                        ? "opacity-50 cursor-not-allowed"
                        : selected
                        ? "bg-halo-violet/5"
                        : "hover:bg-muted/20"
                    )}
                  >
                    {/* Checkbox */}
                    <Checkbox
                      checked={selected}
                      onChange={() => toggleProduct(product._id, item.shop.id)}
                      disabled={ownShop}
                    />

                    {/* Product image */}
                    <Link href={`/prod/${product._id}`} className="shrink-0">
                      <div className="w-[72px] h-[72px] rounded-[12px] overflow-hidden border border-border bg-muted">
                        <Image
                          width={72}
                          height={72}
                          src={(product.images ?? [])[0] ?? defaultAvatar}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    </Link>

                    {/* Product info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/prod/${product._id}`}>
                        <p className="font-medium text-sm leading-snug line-clamp-2 hover:text-halo-violet transition-colors">
                          {product.name}
                        </p>
                      </Link>
                      <p className="text-halo-violet font-bold text-base mt-1">
                        {formatNumber(product.price)}{" "}
                        <span className="text-xs font-normal text-muted-foreground">
                          VND
                        </span>
                      </p>
                      {product.sku && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          SKU: {product.sku}
                        </p>
                      )}
                    </div>

                    {/* Subtotal */}
                    <div className="hidden sm:block text-right min-w-[100px]">
                      <p className="text-xs text-muted-foreground">Thành tiền</p>
                      <p className="font-semibold text-sm">
                        {formatNumber(product.price * product.purchaseQuantity)}{" "}
                        <span className="text-xs text-muted-foreground">
                          VND
                        </span>
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1 shrink-0">
                      <IconButton
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.shop.id, product._id, -1)
                        }
                        disabled={product.purchaseQuantity <= 1}
                        className="border border-border/60 hover:border-halo-violet hover:text-halo-violet"
                      >
                        <Minus size={13} />
                      </IconButton>
                      <span className="w-8 text-center text-sm font-semibold tabular-nums">
                        {product.purchaseQuantity}
                      </span>
                      <IconButton
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.shop.id, product._id, 1)
                        }
                        className="border border-border/60 hover:border-halo-violet hover:text-halo-violet"
                      >
                        <Plus size={13} />
                      </IconButton>
                    </div>

                    {/* Delete */}
                    <Confirmation
                      trigger={
                        <IconButton
                          size="sm"
                          className="text-muted-foreground hover:text-halo-rose hover:bg-halo-rose/10"
                        >
                          <Trash2 size={15} />
                        </IconButton>
                      }
                      content={t("product.message.confirm_delete")}
                      onConfirm={() => {
                        updateQuantity(
                          item.shop.id,
                          product._id,
                          -product.purchaseQuantity
                        );
                        handleRemoveFromCart(product._id);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default CartList;
