"use client";

import { Product, ProductStatus } from "@/core/model/Product";
import { createContext, useContext } from "react";

const ProductDetailMKPContext = createContext<{
  product: Product;
}>({
  product: {
    _id: "",
    productId: "",
    name: "",
    price: 0,
    status: ProductStatus.Available,
    quantity: 0,
    ownerId: "",
    description: "",
    images: [],
    category: "",
  },
});

export function ProductDetailMKPProvider({
  value,
  children,
}: {
  value: { product: Product };
  children: React.ReactNode;
}) {
  return (
    <ProductDetailMKPContext.Provider value={value}>
      {children}
    </ProductDetailMKPContext.Provider>
  );
}

export function useProductDetailMKP() {
  return useContext(ProductDetailMKPContext);
}
