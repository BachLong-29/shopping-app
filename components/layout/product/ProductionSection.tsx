import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import Section from "../Section";

export type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
};

interface IProps {
  data: Product[];
  setProducts: (value: Product[]) => void;
}
const fetchProducts = async (page: number) => {
  return new Array(32).fill(0).map((_, i) => ({
    id: (page - 1) * 32 + i + 1,
    name: `Product ${(page - 1) * 32 + i + 1}`,
    price: `$${(Math.random() * 100).toFixed(2)}`,
    image: `/images/banner1.jpg`,
  }));
};
const ProductionSection = ({ data, setProducts }: IProps) => {
  const [page, setPage] = useState(1);
  const totalPages = 10;
  useEffect(() => {
    fetchProducts(page).then((res) => setProducts(res));
  }, [page]);
  return (
    <>
      <Section title="All Products">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
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
            <ChevronLeft size={16} /> Prev
          </Button>
          <span className="mx-4 text-lg font-semibold">
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next <ChevronRight size={16} />
          </Button>
        </div>
      </Section>
    </>
  );
};

export default ProductionSection;
