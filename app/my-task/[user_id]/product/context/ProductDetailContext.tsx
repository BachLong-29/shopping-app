"use client";

import { Product, ProductStatus } from "@/core/model/Product";
import { createContext, useContext } from "react";

const ProductDetailContext = createContext<{
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
  },
});

export function ProductDetailProvider({
  value,
  children,
}: {
  value: { product: Product };
  children: React.ReactNode;
}) {
  return (
    <ProductDetailContext.Provider value={value}>
      {children}
    </ProductDetailContext.Provider>
  );
}

export function useProductDetail() {
  return useContext(ProductDetailContext);
}
