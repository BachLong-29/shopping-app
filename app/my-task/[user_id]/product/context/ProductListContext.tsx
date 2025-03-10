"use client";

import { createContext, useContext } from "react";

import { Product } from "@/core/model/Product";

const ProductListContext = createContext<{
  products: Product[];
  total: number;
}>({
  products: [],
  total: 0,
});

export function ProductListProvider({
  value,
  children,
}: {
  value: { products: Product[]; total: number };
  children: React.ReactNode;
}) {
  return (
    <ProductListContext.Provider value={value}>
      {children}
    </ProductListContext.Provider>
  );
}

export function useListProduct() {
  return useContext(ProductListContext);
}
