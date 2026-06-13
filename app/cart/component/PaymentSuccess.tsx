"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, Home, CheckCircle2, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store/store";
import { formatNumber } from "@/core/utils/format";
import { Button } from "@/components/design-system/Button";

import { useCartContext } from "../context/CartContext";

/* ------------------------------------------------------------------ */
/* Tiny confetti particle                                               */
/* ------------------------------------------------------------------ */
interface Particle {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
  duration: number;
}

const COLORS = [
  "#7C3AED",
  "#EC4899",
  "#10B981",
  "#F59E0B",
  "#3B82F6",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: Math.random() * 1.2,
    size: 6 + Math.random() * 8,
    duration: 2.5 + Math.random() * 2,
  }));
}

const Confetti = () => {
  const [particles] = useState(() => generateParticles(60));
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 rounded-sm animate-confetti-fall"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Main success screen                                                  */
/* ------------------------------------------------------------------ */
const PaymentSuccess = () => {
  const { orderResults, shippingAddress } = useCartContext();
  const userId = useSelector((state: RootState) => state.profile._id);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const totalAmount = orderResults.reduce((acc, r) => acc + r.totalAmount, 0);
  const now = new Date();
  const dateStr = now.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center py-16 px-4 overflow-hidden">
      <Confetti />

      {/* Glowing background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-halo-violet/10 blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-halo-rose/10 blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-halo-emerald/5 blur-[100px]" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col items-center transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Animated check icon */}
        <div className="relative mb-8">
          {/* Outer ring pulse */}
          <div className="absolute inset-0 rounded-full bg-halo-emerald/20 animate-ping" />
          <div className="absolute inset-[-8px] rounded-full border-2 border-halo-emerald/30 animate-[spin_8s_linear_infinite]" />
          {/* Sparkles */}
          <Sparkles
            size={20}
            className="absolute -top-3 -right-3 text-halo-amber animate-bounce"
            style={{ animationDelay: "0.3s" }}
          />
          <Sparkles
            size={14}
            className="absolute -bottom-2 -left-2 text-halo-violet animate-bounce"
            style={{ animationDelay: "0.6s" }}
          />
          {/* Main icon */}
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-halo-emerald to-emerald-400 flex items-center justify-center shadow-[0_20px_60px_-10px_rgba(16,185,129,0.5)]">
            <CheckCircle2 size={52} className="text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-halo-violet via-halo-rose to-halo-amber bg-clip-text text-transparent">
          Đặt hàng thành công! 🎉
        </h1>
        <p className="text-muted-foreground text-center max-w-sm mb-8">
          Cảm ơn bạn đã tin tưởng mua sắm tại đây. Đơn hàng của bạn đang được
          xử lý và sẽ được giao sớm nhất có thể.
        </p>

        {/* Order summary card */}
        <div
          className="w-full max-w-md bg-card border border-border rounded-[20px] overflow-hidden shadow-lg mb-6"
          style={{ animationDelay: "0.3s" }}
        >
          {/* Card header */}
          <div className="bg-gradient-to-r from-halo-violet/10 to-halo-rose/10 px-6 py-4 border-b border-border/60">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Chi tiết đơn hàng
            </p>
          </div>

          {/* Order rows */}
          <div className="divide-y divide-border/40">
            {orderResults.map((order, idx) => (
              <div key={idx} className="px-6 py-4">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Shop: <span className="text-foreground font-medium">{order.shopName}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                      #{order.orderId.slice(-10).toUpperCase()}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-halo-emerald">
                    {formatNumber(order.totalAmount)} VND
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="px-6 py-4 bg-muted/20 border-t border-border/60 space-y-2">
            {shippingAddress && (
              <div className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Giao tới:</span>{" "}
                {shippingAddress.name} — {shippingAddress.address},{" "}
                {shippingAddress.city}
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">{dateStr}</span>
              <span className="text-base font-bold text-foreground">
                {formatNumber(totalAmount)} VND
              </span>
            </div>
          </div>
        </div>

        {/* Status badge */}
        <div className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-halo-emerald/10 border border-halo-emerald/30">
          <span className="w-2 h-2 rounded-full bg-halo-emerald animate-pulse" />
          <span className="text-xs font-medium text-halo-emerald">
            Đơn hàng đã được xác nhận
          </span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <Link href={`/my-task/${userId}/purchase-order`} className="flex-1">
            <Button variant="gradient" size="lg" className="w-full">
              <ShoppingBag size={18} />
              Xem đơn hàng của tôi
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button variant="outline" size="lg" className="w-full">
              <Home size={18} />
              Tiếp tục mua sắm
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
