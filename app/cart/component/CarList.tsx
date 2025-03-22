/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { RootState } from "@/redux/store/store";
import cartService from "../services/cartServices";
import { debounce } from "lodash";
import { removeFromCart } from "@/redux/reducer/cartReducer";
import { useCallback } from "react";
import { useCartContext } from "../context/CartContext";

const CarList = () => {
  const { cart, setCart, selectedShop, setSelectedShop } = useCartContext();
  const handleSelectShop = (shop: any) => {
    setSelectedShop(shop);
  };
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.profile._id);

  const updateCart = useCallback(
    debounce((productId, purchaseQuantity) => {
      cartService
        .updateCart({ userId, productId, quantity: purchaseQuantity })
        .then((res) => {
          console.log({ res });
        });
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
        .map((shop) => {
          if (shop.shopId !== shopName) return shop;
          return {
            ...shop,
            products: shop.products
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
      {cart.map((shop) => (
        <Card key={shop.shopId} className="p-4">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {shop.shopId}
              <Checkbox
                checked={selectedShop === shop.shopId}
                onCheckedChange={() => handleSelectShop(shop.shopId)}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {shop.products.map((product) => (
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
                      updateQuantity(shop.shopId, product._id, -1);
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
                      updateQuantity(shop.shopId, product._id, 1);
                    }}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    updateQuantity(
                      shop.shopId,
                      product._id,
                      -product.purchaseQuantity
                    );
                    handleRemoveFromCart(product._id);
                  }}
                >
                  <Trash2 size={16} className="text-red-500" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CarList;
