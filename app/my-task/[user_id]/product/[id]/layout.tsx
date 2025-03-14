import type { Metadata } from "next";
import { ProductDetailProvider } from "../context/ProductDetailContext";
import { getDetailProduct } from "@/app/action";
import { use } from "react";

export const metadata: Metadata = {
  title: "Product Detail Page",
  description: "Product Detail Page",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function ProductListLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ user_id: string; id: string }>;
}>) {
  const { user_id, id } = use(params);
  const data = use(getDetailProduct(user_id, id));
  return (
    <ProductDetailProvider value={{ product: data }}>
      {children}
    </ProductDetailProvider>
  );
}
