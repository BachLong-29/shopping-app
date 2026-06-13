"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  ShoppingBag,
  Zap,
  Heart,
  Truck,
  RefreshCcw,
  Shield,
  Check,
  Minus,
  Plus,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Stars } from "@/components/design-system/Stars";
import { Product, ProductStatus } from "@/core/model/Product";
import ProductStatusTag from "@/components/layout/product/ProductStatusTag";
import { formatNumber } from "@/core/utils/format";
import { RootState } from "@/redux/store/store";
import { addToCart } from "@/redux/reducer/cartReducer";
import cartService from "@/app/cart/services/cartServices";

interface Props {
  product: Product;
}

const TAB_IDS = ["ship", "ret", "war"] as const;
type TabId = (typeof TAB_IDS)[number];

export function ProductBuyPanel({ product }: Props) {
  const [tab, setTab] = useState<TabId>("ship");
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);

  const userId = useSelector((state: RootState) => state.profile._id);
  const dispatch = useDispatch();

  const isOwnProduct = userId === product.ownerId;
  const outOfStock = product.status === ProductStatus.OutOfStock;
  const canBuy = !isOwnProduct && !outOfStock;

  const rating = product.rating ?? 4.8;
  const reviewCount = product.reviewCount ?? 1_284;

  const stockPct =
    outOfStock
      ? 0
      : Math.min((product.quantity / Math.max(product.quantity * 3, 50)) * 100, 100);

  const tabs: { id: TabId; icon: React.ReactNode; label: string }[] = [
    { id: "ship", icon: <Truck size={13} />, label: "Giao hàng" },
    { id: "ret", icon: <RefreshCcw size={13} />, label: "Đổi trả" },
    { id: "war", icon: <Shield size={13} />, label: "Bảo hành" },
  ];

  async function handleAddToCart() {
    if (!canBuy) return;
    toast.success("Đã thêm vào giỏ hàng", {
      description: `${product.name} × ${qty}`,
      duration: 3000,
    });
    await cartService.addToCart({ productId: product._id, userId, quantity: qty });
    dispatch(addToCart(product._id));
  }

  const words = product.name.split(" ");
  const titleHead = words.slice(0, -1).join(" ");
  const titleTail = words.slice(-1)[0];

  return (
    <aside className="space-y-5">
      {/* Brand + rating */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-aurora text-white text-[10px] font-bold flex items-center justify-center select-none">
            {(product.category ?? "S").charAt(0).toUpperCase()}
          </span>
          <span className="text-sm font-medium text-foreground">
            {product.category || "Shop"}
          </span>
          <Check size={11} className="text-halo-emerald" />
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          <Stars value={rating} size={14} />
          <strong className="font-semibold tabular-nums">{rating}</strong>
          <span className="text-muted-foreground">
            · {reviewCount.toLocaleString()} đánh giá
          </span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
        {titleHead}{" "}
        <span className="font-display italic text-halo-violet">{titleTail}.</span>
      </h1>

      {/* Description */}
      {product.description && (
        <p className="text-muted-foreground leading-relaxed text-sm">
          {product.description}
        </p>
      )}

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-aurora text-white">
          <Zap size={10} /> Nổi bật
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-halo-sky/10 text-halo-sky border border-halo-sky/20">
          <Shield size={10} /> Đảm bảo
        </span>
        <ProductStatusTag value={product.status} />
      </div>

      {/* Own-product warning */}
      {isOwnProduct && (
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-halo-amber/8 border border-halo-amber/20 text-sm text-halo-amber">
          <span>⚠️</span>
          <span>Đây là sản phẩm của bạn — không thể tự mua.</span>
        </div>
      )}

      {/* Price block */}
      <div className="relative p-5 bg-card border border-border rounded-2xl overflow-hidden">
        <div className="pointer-events-none absolute -top-8 -right-8 w-32 h-32 rounded-full bg-halo-violet/8 blur-3xl" />
        <div className="relative space-y-1">
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-3xl font-bold tracking-tight tabular-nums text-foreground">
              {formatNumber(product.price)}{" "}
              <span className="text-base font-normal text-muted-foreground">VND</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            hoặc 4 ×{" "}
            <strong className="text-foreground">
              {formatNumber(Math.round(product.price / 4))} VND
            </strong>{" "}
            không lãi suất
          </p>

          {/* Stock bar */}
          <div className="pt-3">
            <div className="flex items-center gap-2 text-sm mb-2">
              <span
                className={cn(
                  "w-2 h-2 rounded-full shrink-0",
                  outOfStock ? "bg-muted-foreground" : "bg-halo-emerald animate-pulse"
                )}
              />
              <strong className={outOfStock ? "text-muted-foreground" : "text-halo-emerald"}>
                {outOfStock ? "Hết hàng" : "Còn hàng"}
              </strong>
              <span className="text-muted-foreground">· {product.quantity} sản phẩm</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-halo-rose to-halo-amber transition-all duration-700"
                style={{ width: `${stockPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quantity selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground w-16">Số lượng</span>
        <div className="flex items-center border border-border rounded-xl overflow-hidden">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30"
          >
            <Minus size={14} />
          </button>
          <span className="w-12 text-center font-semibold tabular-nums text-sm">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => Math.min(product.quantity, q + 1))}
            disabled={qty >= product.quantity}
            className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30"
          >
            <Plus size={14} />
          </button>
        </div>
        <span className="text-xs text-muted-foreground">
          (tối đa {product.quantity})
        </span>
      </div>

      {/* CTAs */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          disabled={!canBuy}
          className={cn(
            "w-full h-12 flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all active:scale-[0.98]",
            canBuy
              ? "bg-card border border-border hover:bg-muted/50 text-foreground"
              : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
          )}
        >
          <ShoppingBag size={16} />
          Thêm vào giỏ hàng · {formatNumber(product.price * qty)} VND
        </button>

        <button
          disabled={!canBuy}
          className={cn(
            "w-full h-12 flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all active:scale-[0.98]",
            canBuy
              ? "bg-aurora text-white hover:opacity-90"
              : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
          )}
        >
          <Zap size={16} />
          Mua ngay — thanh toán 1 chạm
        </button>
      </div>

      {/* Secondary actions */}
      <div className="flex gap-2">
        <button
          onClick={() => setWished((w) => !w)}
          className={cn(
            "flex-1 h-10 flex items-center justify-center gap-1.5 rounded-xl border text-sm font-medium transition-colors",
            wished
              ? "border-halo-rose/40 bg-halo-rose/8 text-halo-rose"
              : "border-border bg-card text-muted-foreground hover:border-halo-rose/40 hover:text-halo-rose"
          )}
        >
          <Heart
            size={14}
            fill={wished ? "currentColor" : "none"}
            className="transition-all"
          />
          {wished ? "Đã lưu" : "Yêu thích"}
        </button>
        <button className="flex-1 h-10 flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors">
          <Share2 size={14} />
          Chia sẻ
        </button>
      </div>

      {/* Mini delivery tabs */}
      <div className="border border-border rounded-2xl overflow-hidden">
        <div className="flex divide-x divide-border border-b border-border">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-3 transition-colors",
                tab === t.id
                  ? "bg-halo-violet/8 text-halo-violet border-b-2 border-halo-violet -mb-px"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              )}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
        <div className="p-4 space-y-2.5 text-sm min-h-[80px]">
          {tab === "ship" && (
            <>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Truck size={13} className="text-halo-sky shrink-0" />
                <span>Miễn phí giao hàng cho đơn trên 500,000 VND</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap size={13} className="text-halo-amber shrink-0" />
                <span>
                  Giao trong <strong className="text-halo-rose">2–3 ngày</strong> làm việc
                </span>
              </div>
            </>
          )}
          {tab === "ret" && (
            <>
              <div className="flex items-center gap-2 text-muted-foreground">
                <RefreshCcw size={13} className="text-halo-emerald shrink-0" />
                <span>Đổi trả trong vòng 30 ngày</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check size={13} className="text-halo-emerald shrink-0" />
                <span>Hoàn tiền trong 3–5 ngày làm việc</span>
              </div>
            </>
          )}
          {tab === "war" && (
            <>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield size={13} className="text-halo-violet shrink-0" />
                <span>Bảo hành 12 tháng từ nhà sản xuất</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check size={13} className="text-halo-violet shrink-0" />
                <span>Hỗ trợ kỹ thuật miễn phí trọn đời</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* SKU row */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-mono pt-1">
        {product.sku && (
          <>
            <span>SKU · {product.sku.toUpperCase()}</span>
            <span className="opacity-40">·</span>
          </>
        )}
        <span>ID · {product._id.slice(-8).toUpperCase()}</span>
      </div>
    </aside>
  );
}
