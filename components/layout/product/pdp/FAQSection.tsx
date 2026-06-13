"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Sản phẩm có được bảo hành không?",
    a: "Có — tất cả sản phẩm của chúng tôi đều được bảo hành 12 tháng từ nhà sản xuất. Trong thời gian bảo hành, chúng tôi hỗ trợ sửa chữa hoặc đổi mới miễn phí nếu lỗi do nhà sản xuất.",
  },
  {
    q: "Tôi có thể đổi trả sản phẩm không?",
    a: "Bạn có thể đổi trả trong vòng 30 ngày kể từ ngày nhận hàng, với điều kiện sản phẩm còn nguyên vẹn, chưa qua sử dụng và còn nguyên tem mác. Quy trình hoàn tiền mất từ 3–5 ngày làm việc.",
  },
  {
    q: "Thời gian giao hàng mất bao lâu?",
    a: "Đơn hàng nội thành thường giao trong 1–2 ngày làm việc. Đơn hàng ngoại tỉnh từ 3–5 ngày. Chúng tôi hỗ trợ giao hàng nhanh (hỏa tốc) trong vòng 4 giờ tại một số khu vực.",
  },
  {
    q: "Làm thế nào để theo dõi đơn hàng?",
    a: "Sau khi đặt hàng thành công, bạn sẽ nhận được email xác nhận kèm mã vận đơn. Bạn có thể theo dõi trạng thái đơn hàng trong mục 'Đơn mua' trên tài khoản của mình.",
  },
  {
    q: "Sản phẩm có chính hãng không?",
    a: "Tất cả sản phẩm trên nền tảng của chúng tôi đều là hàng chính hãng, có đầy đủ hóa đơn và chứng từ nguồn gốc. Chúng tôi cam kết hoàn tiền 100% nếu phát hiện hàng giả.",
  },
  {
    q: "Tôi có thể mua số lượng lớn không?",
    a: "Có, chúng tôi hỗ trợ đặt hàng số lượng lớn với giá ưu đãi riêng. Vui lòng liên hệ đội ngũ hỗ trợ qua chat để được báo giá sỉ và ưu đãi phù hợp.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-border/60 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-halo-violet mb-2">
            Câu hỏi thường gặp
          </p>
          <h2 className="text-3xl font-bold tracking-tight">
            Những điều bạn{" "}
            <em className="font-display not-italic text-halo-violet">muốn biết.</em>
          </h2>
        </div>
        <a className="text-sm text-halo-violet hover:underline underline-offset-4 transition-colors shrink-0">
          Xem tất cả câu hỏi →
        </a>
      </div>

      <div className="space-y-px border border-border rounded-2xl overflow-hidden">
        {faqs.map((f, i) => (
          <div key={i} className={cn("bg-card", i !== faqs.length - 1 && "border-b border-border/60")}>
            <button
              className="w-full flex items-center gap-4 px-6 py-5 text-left group"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="text-xs font-mono text-muted-foreground shrink-0 w-6">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "flex-1 text-sm font-medium leading-relaxed transition-colors",
                  open === i ? "text-halo-violet" : "text-foreground group-hover:text-halo-violet"
                )}
              >
                {f.q}
              </span>
              <span
                className={cn(
                  "w-7 h-7 flex items-center justify-center rounded-full border transition-all shrink-0",
                  open === i
                    ? "border-halo-violet bg-halo-violet/10 text-halo-violet"
                    : "border-border text-muted-foreground group-hover:border-halo-violet group-hover:text-halo-violet"
                )}
              >
                {open === i ? <Minus size={13} /> : <Plus size={13} />}
              </span>
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                open === i ? "max-h-96" : "max-h-0"
              )}
            >
              <p className="px-6 pb-5 pl-16 text-sm text-muted-foreground leading-relaxed">
                {f.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
