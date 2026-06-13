"use client";

import { use, useEffect } from "react";
import WrapperContent from "@/components/layout/section/WrapperContent";
import { useBreadcrumb } from "@/core/context/BreadcrumbContext";
import { useLanguage } from "@/core/context/LanguageContext";
import { useProductDetail } from "../../context/ProductDetailContext";
import withMyTask from "@/components/forms/withMyTask";

import { ProductGallery } from "@/components/layout/product/pdp/ProductGallery";
import { ProductInfoPanel } from "./components/ProductInfoPanel";
import { HighlightsStrip } from "@/components/layout/product/pdp/HighlightsStrip";
import { ProductTabs } from "@/components/layout/product/pdp/ProductTabs";
import { ReviewsSection } from "@/components/layout/product/pdp/ReviewsSection";
import { FAQSection } from "@/components/layout/product/pdp/FAQSection";

const ProductDetailPage = ({
  params,
}: {
  params: Promise<{ user_id: string; id: string }>;
}) => {
  const { user_id: userId, id: productId } = use(params);
  const { product } = useProductDetail();
  const { setBreadcrumb } = useBreadcrumb();
  const { t } = useLanguage();

  useEffect(() => {
    setBreadcrumb([
      {
        label: t("module.product"),
        href: `/my-task/${userId}/product`,
      },
      { label: product.name || productId },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.name]);

  return (
    <WrapperContent>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 pb-20">
        {/* Hero: gallery + info panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 py-10">
          <ProductGallery
            images={product.images ?? []}
            productName={product.name}
          />
          <ProductInfoPanel product={product} userId={userId} />
        </div>

        {/* Highlights strip */}
        <HighlightsStrip />

        {/* Product tabs: overview / features / specs / story */}
        <ProductTabs product={product} />

        {/* Reviews */}
        <ReviewsSection product={product} />

        {/* FAQ */}
        <FAQSection />
      </div>
    </WrapperContent>
  );
};

export default withMyTask(ProductDetailPage);
