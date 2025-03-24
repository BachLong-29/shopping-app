"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

import { CartByOwner } from "@/core/model/Cart";

interface ICartContext {
  cart: CartByOwner[];
  setCart: Dispatch<SetStateAction<CartByOwner[]>>;

  selectedShop: string;
  setSelectedShop: (value: string) => void;
}

const CartContext = createContext<ICartContext>({
  cart: [],
  setCart: () => {},
  selectedShop: "",
  setSelectedShop: () => {},
});

export const CartProvider = ({
  children,
  cartData,
}: {
  children: ReactNode;
  cartData: CartByOwner[];
}) => {
  const [cart, setCart] = useState(cartData);
  const [selectedShop, setSelectedShop] = useState(cartData[0]?.shop.id);

  return (
    <CartContext.Provider
      value={{ cart, setCart, selectedShop, setSelectedShop }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
