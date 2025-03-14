import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import Section from "../section/Section";
import { useLanguage } from "@/core/context/LanguageContext";

interface IProps {
  data: {
    id: string | number;
    name: string;
    price: string;
    image: string;
  }[];
  setProducts: (
    value: {
      id: string | number;
      name: string;
      price: string;
      image: string;
    }[]
  ) => void;
}
const fetchProducts = async (page: number) => {
  return new Array(36).fill(0).map((_, i) => ({
    id: (page - 1) * 36 + i + 1,
    name: `Product ${(page - 1) * 36 + i + 1}`,
    price: `${(Math.random() * 100).toFixed(2)}đ`,
    image: `/images/product.jpg`,
  }));
};
const ProductionSection = ({ data, setProducts }: IProps) => {
  const [page, setPage] = useState(1);
  const { t } = useLanguage();

  const totalPages = 10;
  useEffect(() => {
    fetchProducts(page).then((res) => setProducts(res));
  }, [page, setProducts]);
  return (
    <div>
      <Section title={t("general.all_products")}>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {data.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
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
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            {t("pagination.next")}
            <ChevronRight size={16} />
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default ProductionSection;
