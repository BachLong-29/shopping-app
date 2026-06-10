import type { Metadata } from "next";
import { SODetailProvider } from "../../context/SODetailContext";
import salesOrderService from "../../services/salesOrdertService";
import { use } from "react";

export const metadata: Metadata = {
  title: "Sales Order Detail",
  description: "Sales Order Detail Page",
};

export default function SODetailLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ user_id: string; id: string }>;
}>) {
  const { user_id, id } = use(params);
  const data = use(salesOrderService.getDetail({ userId: user_id, orderId: id }));
  return (
    <SODetailProvider value={{ order: data.salesOrder }}>
      {children}
    </SODetailProvider>
  );
}
