import type { Metadata } from "next";
import { ProductDetailMKPProvider } from "./context/ProductDetailMKP";
import { getDetailProductFromMKP } from "@/app/action";
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

export default function ProductMKPLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ prod_id: string }>;
}>) {
  const { prod_id: id } = use(params);
  const data = use(getDetailProductFromMKP(id));
  return (
    <ProductDetailMKPProvider value={{ product: data }}>
      {children}
    </ProductDetailMKPProvider>
  );
}
