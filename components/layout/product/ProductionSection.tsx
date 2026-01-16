"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Product } from "@/core/model/Product";
import ProductCard from "./ProductCard";
import Section from "../section/Section";
import { Toaster } from "sonner";
import productService from "@/app/my-task/[user_id]/product/services/productService";
import { useLanguage } from "@/core/context/LanguageContext";
import { useState } from "react";

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

const ProductionSection = ({ data }: IProps) => {
  const [products, setProducts] = useState(data.data);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(data.pagination.totalPages);
  const { t } = useLanguage();

  const handleNextPage = async () => {
    setPage((p) => Math.min(p + 1, totalPages));
    const res = await productService.getProductsMKP({
      limit: 15,
      page: page + 1,
    });
    setProducts(res.data);
    setTotalPages(res.pagination.totalPages);
  };
  const handlePrevPage = async () => {
    setPage((p) => Math.max(p - 1, 1));
    const res = await productService.getProductsMKP({
      limit: 15,
      page: page - 1,
    });
    setProducts(res.data);
    setTotalPages(res.pagination.totalPages);
  };

  return (
    <div>
      <Section title={t("general.top_seller")}>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            <ChevronLeft size={16} />
            {t("pagination.prev")}
          </Button>
          <span className="mx-4 text-lg font-semibold">
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            {t("pagination.next")}
            <ChevronRight size={16} />
          </Button>
        </div>
      </Section>
      <Toaster position="top-right" />
    </div>
  );
};

export default ProductionSection;
