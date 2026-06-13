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

export type CheckoutStep = "cart" | "checkout" | "success";

export interface ShippingAddress {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postal: string;
  country: string;
  paymentMethod: "cod" | "transfer";
}

export interface OrderResult {
  orderId: string;
  transactionId?: string;
  totalAmount: number;
  shopName: string;
}

interface ICartContext {
  cart: CartByOwner[];
  setCart: Dispatch<SetStateAction<CartByOwner[]>>;

  currentUserId: string;

  selectedItems: Set<string>;
  setSelectedItems: Dispatch<SetStateAction<Set<string>>>;

  checkoutStep: CheckoutStep;
  setCheckoutStep: Dispatch<SetStateAction<CheckoutStep>>;

  orderResults: OrderResult[];
  setOrderResults: Dispatch<SetStateAction<OrderResult[]>>;

  shippingAddress: ShippingAddress | null;
  setShippingAddress: Dispatch<SetStateAction<ShippingAddress | null>>;
}

const CartContext = createContext<ICartContext>({
  cart: [],
  setCart: () => {},
  currentUserId: "",
  selectedItems: new Set(),
  setSelectedItems: () => {},
  checkoutStep: "cart",
  setCheckoutStep: () => {},
  orderResults: [],
  setOrderResults: () => {},
  shippingAddress: null,
  setShippingAddress: () => {},
});

export const CartProvider = ({
  children,
  cartData,
  currentUserId,
}: {
  children: ReactNode;
  cartData: CartByOwner[];
  currentUserId: string;
}) => {
  const [cart, setCart] = useState(cartData);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("cart");
  const [orderResults, setOrderResults] = useState<OrderResult[]>([]);
  const [shippingAddress, setShippingAddress] =
    useState<ShippingAddress | null>(null);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        currentUserId,
        selectedItems,
        setSelectedItems,
        checkoutStep,
        setCheckoutStep,
        orderResults,
        setOrderResults,
        shippingAddress,
        setShippingAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
