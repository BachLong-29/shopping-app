"use client";

import { Toaster } from "sonner";
import { useProductDetailMKP } from "./context/ProductDetailMKP";
import { ProductGallery } from "@/components/layout/product/pdp/ProductGallery";
import { HighlightsStrip } from "@/components/layout/product/pdp/HighlightsStrip";
import { ProductTabs } from "@/components/layout/product/pdp/ProductTabs";
import { ReviewsSection } from "@/components/layout/product/pdp/ReviewsSection";
import { FAQSection } from "@/components/layout/product/pdp/FAQSection";
import { ProductBuyPanel } from "./components/ProductBuyPanel";

const ProductDetail = () => {
  const { product } = useProductDetailMKP();

  return (
    <>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 pb-20">
        {/* Hero: gallery + buy panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 py-10">
          <ProductGallery
            images={product.images ?? []}
            productName={product.name}
          />
          <ProductBuyPanel product={product} />
        </div>

        {/* Highlights strip */}
        <HighlightsStrip />

        {/* Product tabs */}
        <ProductTabs product={product} />

        {/* Reviews */}
        <ReviewsSection product={product} />

        {/* FAQ */}
        <FAQSection />
      </div>

      <Toaster position="top-right" />
    </>
  );
};

export default ProductDetail;
