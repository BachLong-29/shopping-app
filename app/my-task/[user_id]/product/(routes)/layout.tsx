import type { Metadata } from "next";
import { ProductListProvider } from "../context/ProductListContext";
import { getListProducts } from "@/app/action";
import { use } from "react";

export const metadata: Metadata = {
  title: "Product Page",
  description: "Product list",
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
  params: Promise<{ user_id: string }>;
}>) {
  const resolvedParams = use(params);
  const data = use(getListProducts(resolvedParams?.["user_id"]));
  return (
    <ProductListProvider value={{ products: data.data, total: data.total }}>
      {children}
    </ProductListProvider>
  );
}
