"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  images: string[];
  productName: string;
}

function FullscreenModal({
  images,
  active,
  onClose,
  onNavigate,
}: {
  images: string[];
  active: number;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
        onClick={onClose}
        aria-label="Đóng"
      >
        <X size={20} />
      </button>

      <div className="absolute top-4 left-4 text-xs font-mono text-white/60 z-10">
        {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>

      <div
        className="relative w-full max-w-2xl aspect-square"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={images[active]} alt="" fill className="object-contain" />
      </div>

      <div
        className="flex gap-2 mt-4 px-4 overflow-x-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            className={cn(
              "relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-colors",
              active === i ? "border-white" : "border-white/20 hover:border-white/50"
            )}
          >
            <Image src={src} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((active - 1 + images.length) % images.length);
        }}
        aria-label="Trước"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((active + 1) % images.length);
        }}
        aria-label="Tiếp"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

export function ProductGallery({ images, productName }: Props) {
  const galleryImages = images.length > 0 ? images : ["/images/product.jpg"];
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState({ on: false, x: 50, y: 50 });
  const [fsOpen, setFsOpen] = useState(false);
  const [fsActive, setFsActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);

  function onMouseMove(e: React.MouseEvent) {
    if (!stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    setZoom((z) => ({
      ...z,
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    }));
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStart.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 50) {
      setActive((a) => (a + (dx < 0 ? 1 : -1) + galleryImages.length) % galleryImages.length);
    }
  }

  return (
    <>
      <div className="flex gap-3 md:gap-4">
        {/* Thumbnail rail */}
        <div className="hidden md:flex flex-col gap-2.5 w-[68px] shrink-0">
          {galleryImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-[4/5] rounded-xl overflow-hidden border-2 transition-all duration-200",
                active === i
                  ? "border-halo-violet ring-2 ring-halo-violet/20"
                  : "border-border hover:border-halo-violet/40"
              )}
            >
              <Image src={src} alt={`View ${i + 1}`} fill className="object-cover" />
              {i === 0 && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-bold text-white bg-black/60 rounded px-1 pointer-events-none">
                  Hero
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Main stage */}
        <div
          ref={stageRef}
          className={cn(
            "relative flex-1 aspect-square rounded-3xl overflow-hidden",
            "bg-gradient-to-br from-muted/60 via-muted/30 to-muted/50 border border-border/60",
            zoom.on ? "cursor-zoom-in" : "cursor-default"
          )}
          onMouseEnter={() => setZoom((z) => ({ ...z, on: true }))}
          onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Decorative orbs */}
          <span className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 rounded-full bg-halo-violet/20 blur-[80px] animate-float" />
          <span
            className="pointer-events-none absolute -bottom-10 right-0 w-48 h-48 rounded-full bg-halo-rose/15 blur-[80px] animate-float"
            style={{ animationDelay: "3s" }}
          />
          <span
            className="pointer-events-none absolute top-1/3 left-1/3 w-32 h-32 rounded-full bg-halo-amber/10 blur-[60px] animate-float"
            style={{ animationDelay: "6s" }}
          />

          {/* Image stack */}
          <div className="absolute inset-[8%] z-10">
            {galleryImages.map((src, i) => (
              <div
                key={i}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  active === i ? "opacity-100" : "opacity-0"
                )}
              >
                <div
                  className="absolute inset-0 transition-transform duration-150"
                  style={
                    active === i && zoom.on
                      ? {
                          transform: `scale(1.6) translate(${(50 - zoom.x) * 0.4}%, ${(50 - zoom.y) * 0.4}%)`,
                          transformOrigin: `${zoom.x}% ${zoom.y}%`,
                        }
                      : {}
                  }
                >
                  <Image src={src} alt={productName} fill className="object-contain" draggable={false} />
                </div>
              </div>
            ))}
          </div>

          {/* Fullscreen button */}
          <button
            onClick={() => { setFsActive(active); setFsOpen(true); }}
            className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-xl bg-background/80 backdrop-blur-sm border border-border/60 text-foreground hover:bg-background transition-colors"
            aria-label="Toàn màn hình"
          >
            <Maximize2 size={14} />
          </button>

          {/* Live chip */}
          <div className="absolute bottom-14 md:bottom-3 left-3 z-20">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border/60 text-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-halo-rose animate-pulse" />
              Trực tiếp · 142 xem
            </span>
          </div>

          {/* Arrows */}
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border/60 hover:bg-background transition-colors"
            onClick={() => setActive((a) => (a - 1 + galleryImages.length) % galleryImages.length)}
            aria-label="Trước"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border/60 hover:bg-background transition-colors"
            onClick={() => setActive((a) => (a + 1) % galleryImages.length)}
            aria-label="Tiếp"
          >
            <ChevronRight size={16} />
          </button>

          {/* Dot pagination – mobile */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 md:hidden">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-full transition-all duration-300",
                  active === i ? "w-5 h-1.5 bg-halo-violet" : "w-1.5 h-1.5 bg-foreground/30"
                )}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {fsOpen && (
        <FullscreenModal
          images={galleryImages}
          active={fsActive}
          onClose={() => setFsOpen(false)}
          onNavigate={setFsActive}
        />
      )}
    </>
  );
}
