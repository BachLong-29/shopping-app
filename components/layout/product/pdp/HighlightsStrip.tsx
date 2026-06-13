"use client";

import { Truck, RefreshCcw, Shield, Leaf, MessageCircle } from "lucide-react";

const items = [
  {
    icon: Truck,
    tint: "bg-halo-sky/10 text-halo-sky",
    title: "Miễn phí vận chuyển",
    sub: "Giao nhanh 2 ngày",
  },
  {
    icon: RefreshCcw,
    tint: "bg-halo-emerald/10 text-halo-emerald",
    title: "Đổi trả 30 ngày",
    sub: "Không câu hỏi",
  },
  {
    icon: Shield,
    tint: "bg-halo-violet/10 text-halo-violet",
    title: "Bảo hành 12 tháng",
    sub: "Hỗ trợ trọn đời",
  },
  {
    icon: Leaf,
    tint: "bg-halo-lime/10 text-halo-lime",
    title: "Thân thiện môi trường",
    sub: "Bao bì tái chế",
  },
  {
    icon: MessageCircle,
    tint: "bg-halo-amber/10 text-halo-amber",
    title: "Hỗ trợ 24/7",
    sub: "Đội ngũ thật sự",
  },
];

export function HighlightsStrip() {
  return (
    <section className="border-t border-border/60 py-10">
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <li key={it.title} className="flex items-start gap-3">
              <span
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${it.tint}`}
              >
                <Icon size={18} />
              </span>
              <div>
                <strong className="text-sm font-semibold text-foreground block leading-snug">
                  {it.title}
                </strong>
                <span className="text-xs text-muted-foreground">{it.sub}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
