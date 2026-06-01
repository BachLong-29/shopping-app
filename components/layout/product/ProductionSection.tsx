"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Toaster } from "sonner";

import { Pagination, SkeletonProductCard } from "@/components/design-system";
import { Product } from "@/core/model/Product";
import { useLanguage } from "@/core/context/LanguageContext";
import productService from "@/app/my-task/[user_id]/product/services/productService";
import ProductCard from "./ProductCard";

interface IProps {
  data: {
    data: Product[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalProducts: number;
    };
  };
}

export default function ProductionSection({ data }: IProps) {
  const [products, setProducts] = useState(data.data);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(data.pagination.totalPages);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  async function handlePageChange(next: number) {
    if (next === page || next < 1 || next > totalPages) return;
    setLoading(true);
    setPage(next);
    try {
      const res = await productService.getProductsMKP({
        limit: 15,
        page: next,
      });
      setProducts(res.data);
      setTotalPages(res.pagination.totalPages);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-card ">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        {/* ── Section header ── */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              <span className="h-px w-6 bg-muted-foreground" />
              {t("general.top_seller")}
            </div>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-normal leading-[1.05] tracking-[-0.02em]">
              {t("home.top_seller.title")}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {t("home.top_seller.sub")}
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-all hover:bg-muted"
          >
            {t("home.top_seller.view_all")} <ArrowRight size={14} />
          </button>
        </div>

        {/* ── Product grid ── */}
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 15 }).map((_, i) => (
              <SkeletonProductCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product, i) => (
              <div
                key={product._id}
                className="animate-reveal-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={handlePageChange}
            />
          </div>
        )}

        <Toaster position="top-right" />
      </div>
    </section>
  );
}
