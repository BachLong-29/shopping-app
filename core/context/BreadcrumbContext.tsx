"use client";

import { ReactNode, createContext, useContext, useState } from "react";

type BreadcrumbType = {
  label: string;
  module?: string;
  href?: string;
};

interface BreadcrumbContextProps {
  setBreadcrumb: (value: BreadcrumbType[]) => void;
  breadcrumb: BreadcrumbType[];
}

const BreadcrumbContext = createContext<BreadcrumbContextProps>({
  setBreadcrumb: () => {},
  breadcrumb: [],
});

export const BreadcrumbProvider = ({ children }: { children: ReactNode }) => {
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbType[]>([]);

  return (
    <BreadcrumbContext.Provider value={{ setBreadcrumb, breadcrumb }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => {
  return useContext(BreadcrumbContext);
};
