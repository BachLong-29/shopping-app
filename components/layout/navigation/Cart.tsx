"use client";

import { ShoppingCart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import cartService from "@/app/cart/services/cartServices";
import { setTotal } from "@/redux/reducer/cartReducer";
import { RootState } from "@/redux/store/store";

const Cart = ({ id }: { id?: string }) => {
  const total = useSelector((state: RootState) => state.cart.total);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTotalProds = async () => {
      const result = await cartService.getTotal(id ?? "");
      dispatch(setTotal(result));
    };
    if (id) {
      getTotalProds();
    }
  }, [dispatch, id]);

  return (
    <Link href="/cart">
      <div className="relative flex items-center justify-center w-10 h-9 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 cursor-pointer">
        <ShoppingCart className="text-gray-600" size={20} />
        {!!total && (
          <Badge className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {total}
          </Badge>
        )}
      </div>
    </Link>
  );
};

export default Cart;
