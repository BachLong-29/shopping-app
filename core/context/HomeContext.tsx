"use client";

import { ReactNode, createContext, useContext } from "react";

import { Product } from "../model/Product";

interface HomeContextProps {
  products: {
    data: Product[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalProducts: number;
    };
  };
}

const HomeContext = createContext<HomeContextProps>({
  products: {
    data: [],
    pagination: {
      currentPage: 0,
      totalPages: 0,
      totalProducts: 0,
    },
  },
});

export const HomeProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: {
    products: {
      data: Product[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalProducts: number;
      };
    };
  };
}) => {
  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export const useHomePage = () => {
  return useContext(HomeContext);
};
