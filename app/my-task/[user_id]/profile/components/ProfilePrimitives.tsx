"use client";

import React, { useRef, useEffect, useState, useCallback, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/design-system/Icon";

// ── useInView ─────────────────────────────────────────────────
interface InViewOpts {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
}

export function useInView(opts: InViewOpts = {}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); ob.disconnect(); } },
      {
        threshold: opts.threshold ?? 0.15,
        rootMargin: opts.rootMargin ?? "0px 0px -8% 0px",
        root: opts.root ?? null,
      }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [opts.root, opts.threshold, opts.rootMargin]);

  return [ref, inView] as const;
}

// ── Reveal — fades/slides children up on scroll ───────────────
interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  as?: React.ElementType;
}

export function Reveal({ children, delay = 0, className = "", style = {}, as: Tag = "div" }: RevealProps) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
        className
      )}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}

// ── Counter — animates number into view ───────────────────────
interface CounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  format?: boolean;
}

export function Counter({ value, duration = 1400, prefix = "", suffix = "", decimals = 0, format = true }: CounterProps) {
  const [ref, inView] = useInView();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  const shown = decimals > 0 ? n.toFixed(decimals) : Math.round(n);
  const out = format
    ? Number(shown).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : shown;

  return (
    <span ref={ref as React.Ref<HTMLSpanElement>} className="tabular-nums">
      {prefix}{out}{suffix}
    </span>
  );
}

// ── ProgressRing — animated SVG ring ─────────────────────────
interface ProgressRingProps {
  value?: number;
  size?: number;
  stroke?: number;
  colors?: string[];
  cap?: string;
  trackColor?: string;
  children?: ReactNode;
}

export function ProgressRing({
  value = 75, size = 120, stroke = 10,
  colors = ["#7c3aed", "#ec4899", "#f59e0b"],
  cap, trackColor = "hsl(var(--muted))", children,
}: ProgressRingProps) {
  const [ref, inView] = useInView();
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = inView ? circ * (1 - value / 100) : circ;
  const uid = useRef(`rg-${Math.random().toString(36).slice(2, 8)}`).current;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      ref={ref as React.Ref<HTMLDivElement>}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <defs>
          <linearGradient id={uid} x1="0" y1="0" x2="1" y2="1">
            {colors.map((c, i) => (
              <stop key={i} offset={`${(i / (colors.length - 1)) * 100}%`} stopColor={c} />
            ))}
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={`url(#${uid})`} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.3s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {children ?? (
          <>
            <span className="font-display text-[26px] leading-none tabular-nums">
              <Counter value={value} suffix="%" format={false} />
            </span>
            {cap && <span className="text-[10px] text-halo-soft uppercase tracking-[0.08em] mt-[3px]">{cap}</span>}
          </>
        )}
      </div>
    </div>
  );
}

// ── GlowCard — card with mouse-tracking glow ─────────────────
interface GlowCardProps {
  className?: string;
  style?: CSSProperties;
  glow?: boolean;
  children: ReactNode;
}

export function GlowCard({ className = "", style = {}, glow = true, children }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={glow ? onMove : undefined}
      className={cn(
        "group relative bg-card border border-border rounded-[20px] overflow-hidden",
        "p-[clamp(18px,1.8vw,24px)]",
        "transition-[transform,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:-translate-y-[3px] hover:shadow-lg hover:border-border/60",
        className
      )}
      style={style}
    >
      {glow && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: "radial-gradient(420px circle at var(--mx,50%) var(--my,0%), rgba(124,58,237,0.07), transparent 60%)" }}
        />
      )}
      {children}
    </div>
  );
}

// ── CardHead ──────────────────────────────────────────────────
interface CardHeadProps {
  icon: Parameters<typeof Icon>[0]["name"];
  tint?: string;
  title: string;
  action?: ReactNode;
}

export function CardHead({ icon, tint = "var(--grad-aurora)", title, action }: CardHeadProps) {
  return (
    <div className="flex items-center justify-between gap-3 mb-[18px]">
      <div className="flex items-center gap-2.5 text-[13px] font-semibold tracking-[-0.01em]">
        <span
          className="w-[30px] h-[30px] rounded-[10px] inline-flex items-center justify-center text-white flex-shrink-0 shadow-[0_6px_16px_-6px_rgba(124,58,237,0.55)]"
          style={{ background: tint }}
        >
          <Icon name={icon} size={16} />
        </span>
        {title}
      </div>
      {action}
    </div>
  );
}

// ── InfoRow ──────────────────────────────────────────────────
interface InfoRowProps {
  icon: Parameters<typeof Icon>[0]["name"];
  label: string;
  value: string;
  mono?: boolean;
}

export function InfoRow({ icon, label, value, mono }: InfoRowProps) {
  return (
    <div className="flex items-center gap-3 py-[11px] border-b border-border last:border-b-0">
      <span className="w-8 h-8 rounded-[10px] bg-muted text-muted-foreground inline-flex items-center justify-center flex-shrink-0">
        <Icon name={icon} size={15} />
      </span>
      <div className="min-w-0">
        <div className="text-[11px] text-halo-soft uppercase tracking-[0.06em]">{label}</div>
        <div
          className="text-sm font-semibold tracking-[-0.01em] mt-px truncate"
          style={{ fontFamily: mono ? "var(--font-mono)" : "inherit" }}
        >
          {value || "—"}
        </div>
      </div>
    </div>
  );
}

// ── SecHead ──────────────────────────────────────────────────
interface SecHeadProps {
  kicker?: string;
  title: string;
  desc?: string;
  action?: ReactNode;
}

export function SecHead({ kicker, title, desc, action }: SecHeadProps) {
  return (
    <div className="flex items-end justify-between gap-4 mt-[clamp(40px,5vw,64px)] mb-[clamp(16px,2vw,24px)]">
      <div>
        {kicker && (
          <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-halo-soft mb-2">
            {kicker}
          </div>
        )}
        <h2 className="font-display font-normal text-[clamp(26px,3.2vw,38px)] leading-none tracking-[-0.02em]">
          {title}
        </h2>
        {desc && <p className="text-[13px] text-muted-foreground mt-1.5">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

// ── Spark — mini animated sparkline bars ─────────────────────
interface SparkProps {
  data: number[];
  color?: string;
}

export function Spark({ data, color = "#7c3aed" }: SparkProps) {
  const [ref, inView] = useInView();
  const max = Math.max(...data);

  return (
    <div className="flex gap-0.5 items-end h-[22px] mt-1" ref={ref as React.Ref<HTMLDivElement>}>
      {data.map((d, i) => (
        <i
          key={i}
          className="flex-1 rounded-[1.5px]"
          style={{
            height: inView ? `${(d / max) * 100}%` : "8%",
            background: i === data.length - 1 ? color : "hsl(var(--border))",
            opacity: i === data.length - 1 ? 1 : 0.6,
            transition: `height 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 40}ms`,
          }}
        />
      ))}
    </div>
  );
}

// ── PSwitch — preference toggle ───────────────────────────────
interface PSwitchProps {
  on?: boolean;
  onChange?: (v: boolean) => void;
}

export function PSwitch({ on: initial = false, onChange }: PSwitchProps) {
  const [on, setOn] = useState(initial);
  const toggle = () => {
    setOn((o) => { const next = !o; onChange?.(next); return next; });
  };
  return (
    <button
      className={cn(
        "relative w-11 h-[26px] rounded-full border flex-shrink-0 cursor-pointer",
        "transition-all duration-[250ms]",
        on ? "bg-halo-violet border-halo-violet" : "bg-muted border-border"
      )}
      onClick={toggle}
      role="switch"
      aria-checked={on}
      type="button"
    >
      <span
        className={cn(
          "absolute top-[3px] left-[3px] w-[18px] h-[18px] rounded-full bg-white",
          "shadow-sm transition-transform duration-[250ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          on && "translate-x-[18px]"
        )}
      />
    </button>
  );
}
