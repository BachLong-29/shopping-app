"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/design-system";
import { useLanguage } from "@/core/context/LanguageContext";

const BANNER_IMAGES = [
  "/banner/banner1.jpg",
  "/banner/banner2.jpg",
  "/banner/banner3.jpg",
];

export default function Banner() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setActive((a) => (a + 1) % 3), 7000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const slides = [1, 2, 3].map((n) => ({
    eyebrow: t(`home.hero.slide_${n}_eyebrow`),
    titleLine1: t(`home.hero.slide_${n}_title_1`),
    titleLine2: t(`home.hero.slide_${n}_title_2`),
    sub: t(`home.hero.slide_${n}_sub`),
    cta1: t(`home.hero.slide_${n}_cta_1`),
    cta2: t(`home.hero.slide_${n}_cta_2`),
    stat1: {
      value: t(`home.hero.slide_${n}_stat_1_value`),
      label: t(`home.hero.slide_${n}_stat_1_label`),
    },
    stat2: {
      value: t(`home.hero.slide_${n}_stat_2_value`),
      label: t(`home.hero.slide_${n}_stat_2_label`),
    },
    banner: BANNER_IMAGES[n - 1],
  }));

  const slide = slides[active];

  return (
    <section className="relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -top-20 left-[40%] h-96 w-96 rounded-full bg-halo-violet opacity-30 blur-[80px] animate-float" />
      <div className="pointer-events-none absolute right-[5%] top-24 h-80 w-80 rounded-full bg-halo-pink opacity-25 blur-[80px] animate-float [animation-delay:2s]" />
      <div className="pointer-events-none absolute bottom-0 left-[8%] h-64 w-64 rounded-full bg-halo-amber opacity-20 blur-[80px] animate-float [animation-delay:4s]" />

      <div className="max-w-[1400px] mx-auto px-6 pt-6 pb-[56px]">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
          <div className="grid min-h-[480px] grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
            {/* Copy side */}
            <div className="flex flex-col justify-between p-8 lg:p-14">
              <div key={active} className="animate-reveal-up">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-halo-emerald shadow-[0_0_0_4px_rgba(16,185,129,0.2)] animate-pulse" />
                  {slide.eyebrow}
                </div>

                {/* Headline */}
                <h1 className="font-display mt-6 text-[clamp(44px,6vw,80px)] font-normal leading-[0.95] tracking-[-0.02em]">
                  <span className="block">{slide.titleLine1}</span>
                  <span className="block bg-aurora bg-clip-text text-transparent">
                    {slide.titleLine2}
                  </span>
                </h1>

                {/* Sub */}
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                  {slide.sub}
                </p>

                {/* CTAs */}
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link href="/">
                    <Button variant="gradient" size="lg">
                      {slide.cta1}
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" size="lg">
                      {slide.cta2}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Bottom row: dots + stats */}
              <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                <div className="flex gap-1.5">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Slide ${i + 1}`}
                      className={cn(
                        "h-1.5 rounded-full bg-border transition-all duration-300",
                        i === active ? "w-8 bg-foreground" : "w-1.5",
                      )}
                    />
                  ))}
                </div>
                <div className="flex gap-8">
                  {[slide.stat1, slide.stat2].map((s) => (
                    <div key={s.label}>
                      <div className="font-display text-[28px] leading-none">
                        {s.value}
                      </div>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Image side */}
            <div className="relative min-h-[280px] overflow-hidden bg-muted lg:min-h-0">
              {slides.map((s, i) => (
                <div
                  key={i}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    i === active ? "opacity-100" : "opacity-0",
                  )}
                >
                  <Image
                    src={s.banner}
                    alt={s.titleLine1}
                    fill
                    priority={i === 0}
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ))}

              {/* Floating chip – browsing */}
              <div className="absolute bottom-8 left-6 flex items-center gap-3 rounded-full border border-white/20 bg-white/15 px-4 py-2.5 shadow-md backdrop-blur-md">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-aurora text-white">
                  <ShoppingBag size={14} />
                </div>
                <div>
                  <div className="text-[11px] text-white/75">
                    {t("home.hero.chip_browsing")}
                  </div>
                  <div className="text-[13px] font-semibold text-white">
                    {t("home.hero.chip_people", { count: "1,284" })}
                  </div>
                </div>
              </div>

              {/* Floating chip – verified */}
              <div className="absolute right-6 top-8 flex items-center gap-3 rounded-full border border-white/20 bg-white/15 px-4 py-2.5 shadow-md backdrop-blur-md">
                <div>
                  <div className="text-[11px] text-white/75">
                    {t("home.hero.chip_verified")}
                  </div>
                  <div className="text-[13px] font-semibold text-white">
                    {t("home.hero.chip_verified_detail")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
