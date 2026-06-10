"use client";

import { SalesOrder, SalesOrderStatus } from "@/core/model/SO";
import { createContext, useContext } from "react";

const SODetailContext = createContext<{ order: SalesOrder }>({
  order: {
    _id: "",
    user: { _id: "", name: "", email: "" } as any,
    products: {} as any,
    status: SalesOrderStatus.Draft,
    totalAmount: 0,
    createdAt: "",
    updatedAt: "",
  },
});

export function SODetailProvider({
  value,
  children,
}: {
  value: { order: SalesOrder };
  children: React.ReactNode;
}) {
  return (
    <SODetailContext.Provider value={value}>
      {children}
    </SODetailContext.Provider>
  );
}

export function useSODetail() {
  return useContext(SODetailContext);
}
