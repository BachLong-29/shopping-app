"use client";

import { useState } from "react";
import Image from "next/image";
import { Zap, Sparkles, RefreshCcw, Shield, Globe, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/core/model/Product";

const TABS = [
  { id: "overview", label: "Tổng quan" },
  { id: "features", label: "Tính năng" },
  { id: "specs", label: "Thông số" },
  { id: "story", label: "Câu chuyện" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const features = [
  {
    Icon: Zap,
    tint: "bg-halo-amber/10 text-halo-amber",
    title: "Hiệu suất vượt trội",
    sub: "Được tối ưu hóa cho mọi điều kiện sử dụng, đảm bảo trải nghiệm mượt mà và ổn định.",
  },
  {
    Icon: Sparkles,
    tint: "bg-halo-violet/10 text-halo-violet",
    title: "Thiết kế tinh tế",
    sub: "Đường nét được chắt lọc qua nhiều thế hệ, kết hợp giữa thẩm mỹ và công năng.",
  },
  {
    Icon: RefreshCcw,
    tint: "bg-halo-emerald/10 text-halo-emerald",
    title: "Sạc nhanh",
    sub: "Công nghệ sạc hiện đại, chỉ cần 5 phút để dùng thêm nhiều giờ liên tục.",
  },
  {
    Icon: Shield,
    tint: "bg-halo-rose/10 text-halo-rose",
    title: "Bảo vệ toàn diện",
    sub: "Chứng nhận IP68, khả năng chống bụi và chống nước ở độ sâu đến 1.5m.",
  },
  {
    Icon: Globe,
    tint: "bg-halo-sky/10 text-halo-sky",
    title: "Kết nối đa điểm",
    sub: "Kết nối đồng thời với nhiều thiết bị, chuyển đổi tức thì bằng một chạm.",
  },
  {
    Icon: Leaf,
    tint: "bg-halo-lime/10 text-halo-lime",
    title: "Thân thiện môi trường",
    sub: "Linh kiện có thể thay thế, bao bì 100% tái chế, cam kết trung hòa carbon.",
  },
];

const specGroups = [
  {
    title: "Thông số cơ bản",
    items: [
      ["Chất liệu", "Nhôm tái chế · nhựa TPE cao cấp"],
      ["Kích thước", "Xem chi tiết trong hộp sản phẩm"],
      ["Trọng lượng", "287g"],
      ["Màu sắc", "Đen · Trắng · Xanh hải quân"],
    ],
  },
  {
    title: "Hiệu năng",
    items: [
      ["Thời gian sử dụng", "40 giờ liên tục"],
      ["Sạc đầy", "90 phút qua USB-C"],
      ["Sạc nhanh", "5 phút → 5 giờ"],
      ["Kết nối", "Bluetooth 5.3 · USB-C · 3.5mm"],
    ],
  },
  {
    title: "Độ bền",
    items: [
      ["Chứng nhận", "IPX4 · MIL-STD-810H"],
      ["Vòng đời bản lề", "50,000+ chu kỳ"],
      ["Nhiệt độ hoạt động", "−10°C đến 60°C"],
      ["Linh kiện thay thế", "Pin · đệm tai · headband"],
    ],
  },
  {
    title: "Trong hộp",
    items: [
      ["Hộp đựng", "Vải nỉ + nút bần tái chế"],
      ["Cáp", "USB-C → USB-C · USB-C → 3.5mm"],
      ["Phụ kiện", "Cổng chuyển 6.35mm cho studio"],
      ["Tài liệu", "Thẻ bảo hành 12 tháng"],
    ],
  },
];

function OverviewPane({ product }: { product: Product }) {
  const words = product.name.split(" ");
  const label = words.slice(-1)[0];
  const image = product.images?.[Math.floor((product.images.length ?? 0) / 2)] ?? product.images?.[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      <div className="space-y-6">
        <p className="text-lg leading-relaxed text-foreground font-medium">
          {product.name} là sản phẩm được tạo ra khi chúng tôi dành ba năm để trả lời
          một câu hỏi duy nhất:{" "}
          <em className="text-halo-violet not-italic">
            làm thế nào để tạo ra sản phẩm hoàn hảo nhất?
          </em>
        </p>
        <p className="text-muted-foreground leading-relaxed">
          {product.description ||
            `${product.name} được thiết kế tỉ mỉ từng chi tiết, kết hợp giữa công nghệ
            tiên tiến và vật liệu cao cấp. Mỗi sản phẩm đều trải qua kiểm tra chất
            lượng nghiêm ngặt trước khi đến tay người dùng.`}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-2">
          {[
            { n: "40", unit: "h", label: "thời gian dùng" },
            { n: "−32", unit: "dB", label: "giảm tiếng ồn" },
            { n: "287", unit: "g", label: "tổng trọng lượng" },
          ].map((s) => (
            <div key={s.label} className="text-center p-4 bg-card border border-border rounded-2xl">
              <div className="text-2xl font-display font-bold text-foreground tabular-nums">
                {s.n}
                <span className="text-sm text-muted-foreground">{s.unit}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {image && (
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border bg-muted/30">
          <Image src={image} alt={label} fill className="object-cover" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div className="px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-xl border border-border/60">
              <span className="text-[10px] font-mono text-muted-foreground block">FIG. 01</span>
              <span className="text-xs text-foreground">Chi tiết cấu tạo sản phẩm</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FeaturesPane() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {features.map((f, i) => {
        const Icon = f.Icon;
        return (
          <div
            key={i}
            className="p-5 bg-card border border-border rounded-2xl space-y-3 hover:border-halo-violet/40 transition-colors"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center",
                f.tint
              )}
            >
              <Icon size={18} />
            </div>
            <h4 className="font-semibold text-sm text-foreground">{f.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{f.sub}</p>
          </div>
        );
      })}
    </div>
  );
}

function SpecsPane() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {specGroups.map((g) => (
        <div key={g.title} className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border bg-muted/30">
            <h4 className="text-sm font-semibold text-foreground">{g.title}</h4>
          </div>
          <dl className="divide-y divide-border/60">
            {g.items.map(([k, v]) => (
              <div key={k} className="flex items-start gap-4 px-5 py-3 text-sm">
                <dt className="text-muted-foreground shrink-0 w-36">{k}</dt>
                <dd className="text-foreground font-medium flex-1">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

function StoryPane({ product }: { product: Product }) {
  const storyImage = product.images?.[0];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {storyImage && (
        <div className="relative aspect-square rounded-3xl overflow-hidden border border-border bg-muted/30">
          <Image src={storyImage} alt="Story" fill className="object-cover" />
          <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-xl border border-border/60">
            <span className="text-[10px] font-mono text-muted-foreground block">CHƯƠNG 01</span>
            <span className="text-xs text-foreground">Nguyên mẫu đầu tiên</span>
          </div>
        </div>
      )}
      <div className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-halo-violet">
          Câu chuyện ba năm
        </p>
        <h3 className="text-2xl font-display font-bold leading-tight">
          Chúng tôi đã bỏ đi mười bảy bản thử nghiệm{" "}
          <em className="text-halo-violet">để tìm ra cái này.</em>
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Khi đội ngũ của chúng tôi bắt đầu xây dựng sản phẩm này, bản tóm tắt dự án
          chỉ vỏn vẹn một câu:{" "}
          <em className="text-foreground">"sản phẩm mà người dùng quên rằng mình đang dùng nó."</em>
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Ba mùa đông và vô số lần thử nghiệm sau đó, {product.name} ra đời — kết quả
          gần nhất với tham vọng đó mà chúng tôi từng tạo ra. Mỗi chi tiết đều có lý
          do tồn tại, mỗi vật liệu đều được chọn lọc kỹ lưỡng.
        </p>
        <a className="inline-flex items-center gap-1.5 text-sm text-halo-violet font-medium hover:underline underline-offset-4">
          Đọc nhật ký phát triển →
        </a>
      </div>
    </div>
  );
}

interface Props {
  product: Product;
}

export function ProductTabs({ product }: Props) {
  const [tab, setTab] = useState<TabId>("overview");
  const activeIdx = TABS.findIndex((t) => t.id === tab);

  return (
    <section className="border-t border-border/60 py-16">
      <div className="flex flex-col md:flex-row md:items-end gap-3 mb-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-halo-violet mb-2">
            Về sản phẩm này
          </p>
          <h2 className="text-3xl font-bold tracking-tight">
            Khám phá{" "}
            <em className="font-display not-italic text-halo-violet">{product.name}.</em>
          </h2>
        </div>
      </div>

      {/* Tab bar */}
      <div className="relative bg-muted rounded-2xl p-1.5 flex mb-10 max-w-xl">
        {/* Sliding pill */}
        <div
          className="absolute top-1.5 bottom-1.5 bg-card rounded-[14px] shadow-sm transition-all duration-300 ease-in-out"
          style={{
            left: `calc(${(activeIdx / TABS.length) * 100}% + 6px)`,
            width: `calc(${100 / TABS.length}% - 12px)`,
          }}
        />
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "relative z-10 flex-1 text-sm font-medium py-2.5 rounded-[14px] transition-colors duration-200",
              tab === t.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {tab === "overview" && <OverviewPane product={product} />}
        {tab === "features" && <FeaturesPane />}
        {tab === "specs" && <SpecsPane />}
        {tab === "story" && <StoryPane product={product} />}
      </div>
    </section>
  );
}
