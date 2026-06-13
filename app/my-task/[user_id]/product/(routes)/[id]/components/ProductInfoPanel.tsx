"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Truck,
  RefreshCcw,
  Shield,
  Check,
  Zap,
  Edit,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Stars } from "@/components/design-system/Stars";
import { Product, ProductStatus } from "@/core/model/Product";
import ProductStatusTag from "@/components/layout/product/ProductStatusTag";
import { formatNumber } from "@/core/utils/format";

interface Props {
  product: Product;
  userId: string;
}

const TAB_IDS = ["ship", "ret", "war"] as const;
type TabId = (typeof TAB_IDS)[number];

export function ProductInfoPanel({ product, userId }: Props) {
  const [tab, setTab] = useState<TabId>("ship");

  const rating = product.rating ?? 4.8;
  const reviewCount = product.reviewCount ?? 1_284;
  const stockPct =
    product.status === ProductStatus.OutOfStock
      ? 0
      : Math.min((product.quantity / Math.max(product.quantity * 3, 50)) * 100, 100);

  const tabs: { id: TabId; icon: React.ReactNode; label: string }[] = [
    { id: "ship", icon: <Truck size={13} />, label: "Giao hàng" },
    { id: "ret", icon: <RefreshCcw size={13} />, label: "Đổi trả" },
    { id: "war", icon: <Shield size={13} />, label: "Bảo hành" },
  ];

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

          {/* Stock */}
          <div className="pt-3">
            <div className="flex items-center gap-2 text-sm mb-2">
              <span
                className={cn(
                  "w-2 h-2 rounded-full shrink-0",
                  product.status === ProductStatus.OutOfStock
                    ? "bg-muted-foreground"
                    : "bg-halo-emerald animate-pulse"
                )}
              />
              <strong
                className={
                  product.status === ProductStatus.OutOfStock
                    ? "text-muted-foreground"
                    : "text-halo-emerald"
                }
              >
                {product.status === ProductStatus.OutOfStock
                  ? "Hết hàng"
                  : "Còn hàng"}
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

      {/* CTAs – seller view */}
      <div className="space-y-3">
        <Link href={`/my-task/${userId}/product/${product._id}/edit`} className="block">
          <button className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-aurora text-white font-semibold hover:opacity-90 active:scale-[0.98] transition-all">
            <Edit size={16} />
            Chỉnh sửa sản phẩm
          </button>
        </Link>
        <Link href={`/prod/${product._id}`} target="_blank" className="block">
          <button className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl border border-border bg-card font-medium hover:bg-muted/50 active:scale-[0.98] transition-all text-foreground">
            <Eye size={16} />
            Xem trong cửa hàng
          </button>
        </Link>
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
                  Giao trong{" "}
                  <strong className="text-halo-rose">2–3 ngày</strong> làm việc
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
