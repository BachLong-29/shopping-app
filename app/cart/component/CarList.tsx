/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { debounce, isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Confirmation } from "@/components/layout/custom/Confirmation";
import Image from "next/image";
import Link from "next/link";
import { RootState } from "@/redux/store/store";
import cartService from "../services/cartServices";
import { defaultAvatar } from "@/core/utils/common";
import { removeFromCart } from "@/redux/reducer/cartReducer";
import { useCallback } from "react";
import { useCartContext } from "../context/CartContext";
import { useLanguage } from "@/core/context/LanguageContext";

const CarList = () => {
  const { cart, setCart, selectedShop, setSelectedShop } = useCartContext();
  const { t } = useLanguage();
  const handleSelectShop = (shop: any) => {
    setSelectedShop(shop);
  };
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.profile._id);

  const updateCart = useCallback(
    debounce((productId, purchaseQuantity) => {
      cartService.updateCart({ userId, productId, quantity: purchaseQuantity });
    }, 500),
    [userId]
  );

  const handleRemoveFromCart = (productId: string) => {
    cartService.removeFromCart({ userId, productId }).then(() => {
      dispatch(removeFromCart(productId));
    });
  };

  const updateQuantity = (shopName: any, productId: any, delta: any) => {
    let tempQuantity = 0;
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.shop.id !== shopName) return item;
          return {
            ...item,
            products: item.products
              .map((product) => {
                if (product._id === productId) {
                  const newQuantity = Math.max(
                    0,
                    product.purchaseQuantity + delta
                  );
                  tempQuantity = newQuantity;
                  return {
                    ...product,
                    purchaseQuantity: newQuantity,
                  };
                } else {
                  return product;
                }
              })
              .filter((product) => product.purchaseQuantity > 0),
          };
        })
        .filter((shop) => shop.products.length > 0)
    );
    if (tempQuantity !== 0) {
      updateCart(productId, tempQuantity);
    }
  };
  return (
    <div className="lg:col-span-2 space-y-6">
      {cart.map((item) => (
        <Card key={item.shop.id} className="p-4">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <Link
                href={`/user/${item.shop.id}`}
                className="flex items-center gap-2"
              >
                <Image
                  width={45}
                  height={45}
                  alt="avatar-user"
                  src={
                    !isEmpty(item?.shop?.avatar)
                      ? item?.shop?.avatar
                      : defaultAvatar
                  }
                  className="w-[35px] h-[35px] rounded-full border border-pink-500 cursor-pointer"
                />
                {item.shop.name}
              </Link>
              <Checkbox
                checked={selectedShop === item.shop.id}
                onCheckedChange={() => handleSelectShop(item.shop.id)}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {item.products.map((product) => (
              <div
                key={product._id}
                className="flex items-center gap-4 p-2 border-b"
              >
                <Image
                  width={64}
                  height={64}
                  src={(product.images ?? [])[0]}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-muted-foreground">
                    {product.price.toLocaleString()} VND
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      updateQuantity(item.shop.id, product._id, -1);
                    }}
                    disabled={product.purchaseQuantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-6 text-center">
                    {product.purchaseQuantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      updateQuantity(item.shop.id, product._id, 1);
                    }}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <Confirmation
                  trigger={
                    <Button variant="ghost" size="icon">
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
                  }
                  content={t("product.message.confirm_delete")}
                  onConfirm={() => {
                    updateQuantity(
                      item.shop.id,
                      product._id,
                      -product.purchaseQuantity
                    );
                    handleRemoveFromCart(product._id);
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CarList;
