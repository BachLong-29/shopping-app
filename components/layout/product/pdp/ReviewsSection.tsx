"use client";

import { useState } from "react";
import { ThumbsUp, MessageSquare, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { Stars } from "@/components/design-system/Stars";
import { Product } from "@/core/model/Product";

const breakdown = [
  { stars: 5, pct: 78 },
  { stars: 4, pct: 14 },
  { stars: 3, pct: 5 },
  { stars: 2, pct: 2 },
  { stars: 1, pct: 1 },
];

const traits = [
  { word: "chất lượng sản phẩm", count: 412 },
  { word: "đóng gói cẩn thận", count: 318 },
  { word: "giao hàng nhanh", count: 287 },
  { word: "giá cả hợp lý", count: 192 },
  { word: "đúng mô tả", count: 154 },
];

const REVIEWS = [
  {
    name: "Nguyễn Minh Tuấn",
    role: "Kỹ sư phần mềm, Hà Nội",
    avatarGrad: "from-halo-violet to-halo-rose",
    rating: 5,
    helpful: 184,
    title: "Sản phẩm vượt kỳ vọng",
    body: "Chất lượng thực sự rất tốt, đóng gói cẩn thận và giao hàng đúng hẹn. Tôi đã mua lần thứ hai và vẫn hài lòng như lần đầu.",
    when: "2 ngày trước",
    verified: true,
  },
  {
    name: "Lê Thu Hương",
    role: "Giáo viên, TP. HCM",
    avatarGrad: "from-halo-amber to-halo-rose",
    rating: 5,
    helpful: 92,
    title: "Mua làm quà tặng, cực kỳ ưng ý",
    body: "Mua để tặng bạn, ai cũng khen đẹp. Shop giao hàng siêu nhanh, có gói quà cẩn thận. Sẽ ủng hộ shop dài dài.",
    when: "6 ngày trước",
    verified: true,
  },
  {
    name: "Trần Văn Đức",
    role: "Kiến trúc sư, Đà Nẵng",
    avatarGrad: "from-halo-sky to-halo-emerald",
    rating: 4,
    helpful: 41,
    title: "Tốt nhưng có thể cải thiện thêm",
    body: "Sản phẩm chất lượng ổn, đúng mô tả. Chỉ tiếc phần hướng dẫn sử dụng hơi ít thông tin. Nhưng nhìn chung rất đáng tiền.",
    when: "2 tuần trước",
    verified: true,
  },
];

const FILTERS = ["Tất cả", "5★", "4★", "3★", "Có ảnh"] as const;

interface Props {
  product: Product;
}

export function ReviewsSection({ product }: Props) {
  const [filter, setFilter] = useState("Tất cả");
  const rating = product.rating ?? 4.8;
  const reviewCount = product.reviewCount ?? 1_284;

  return (
    <section className="border-t border-border/60 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-halo-violet mb-2">
            Đánh giá từ khách hàng
          </p>
          <h2 className="text-3xl font-bold tracking-tight">
            {reviewCount.toLocaleString()} người đã{" "}
            <em className="font-display not-italic text-halo-violet">tin dùng.</em>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10">
        {/* Summary sidebar */}
        <div className="space-y-6">
          {/* Big score */}
          <div className="flex items-center gap-4">
            <span className="text-6xl font-display font-bold tracking-tight leading-none">
              {rating}
            </span>
            <div>
              <Stars value={rating} size={20} />
              <p className="text-xs text-muted-foreground mt-1.5">
                Dựa trên{" "}
                <strong className="text-foreground">
                  {reviewCount.toLocaleString()}
                </strong>{" "}
                đánh giá
              </p>
            </div>
          </div>

          {/* Breakdown bars */}
          <div className="space-y-2">
            {breakdown.map((b) => (
              <div key={b.stars} className="flex items-center gap-3 text-sm">
                <span className="text-xs text-muted-foreground w-5 text-right shrink-0">
                  {b.stars}★
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-halo-amber to-halo-rose transition-all duration-700"
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8 shrink-0">
                  {b.pct}%
                </span>
              </div>
            ))}
          </div>

          {/* Trait chips */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Khách nhắc nhiều đến</h4>
            <div className="flex flex-wrap gap-2">
              {traits.map((t) => (
                <button
                  key={t.word}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-border bg-card hover:border-halo-violet hover:text-halo-violet hover:bg-halo-violet/5 transition-colors"
                >
                  {t.word}
                  <span className="font-semibold text-muted-foreground">
                    {t.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button className="w-full h-10 flex items-center justify-center gap-2 rounded-xl border border-border bg-card text-sm font-medium hover:bg-muted/50 transition-colors">
            + Viết đánh giá
          </button>
        </div>

        {/* Review list */}
        <div>
          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "text-xs font-medium px-3.5 py-1.5 rounded-full border transition-colors",
                  filter === f
                    ? "border-halo-violet bg-halo-violet text-white"
                    : "border-border bg-card hover:border-halo-violet/50 text-foreground"
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {REVIEWS.map((r, i) => (
              <article
                key={i}
                className="p-5 bg-card border border-border rounded-2xl space-y-3"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <header className="flex items-start gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 bg-gradient-to-br",
                      r.avatarGrad
                    )}
                  >
                    {r.name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(-2)
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <strong className="text-sm font-semibold">{r.name}</strong>
                      {r.verified && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-halo-emerald/10 text-halo-emerald border border-halo-emerald/20">
                          ✓ Đã mua
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {r.role} · {r.when}
                    </div>
                  </div>
                  <Stars value={r.rating} size={13} className="shrink-0" />
                </header>

                <h4 className="font-semibold text-sm">{r.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.body}</p>

                <footer className="flex items-center gap-3 pt-1">
                  <button className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <ThumbsUp size={12} />
                    Hữu ích · <strong>{r.helpful}</strong>
                  </button>
                  <button className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <MessageSquare size={12} />
                    Trả lời
                  </button>
                  <button className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <Bookmark size={12} />
                    Lưu
                  </button>
                </footer>
              </article>
            ))}

            <button className="w-full h-11 flex items-center justify-center gap-2 rounded-xl border border-border bg-card text-sm font-medium hover:bg-muted/50 transition-colors mt-2">
              Xem thêm 1,281 đánh giá →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
