/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Product } from "@/core/model/Product";
import { useState } from "react";

interface IProps {
  data: {
    shopId: string;
    products: (Product & {
      purchaseQuantity: number;
    })[];
  }[];
}
const CarList = (props: IProps) => {
  const { data } = props;
  const [cart, setCart] = useState(data);
  const [selectedShop, setSelectedShop] = useState(data[0]?.shopId);

  const handleSelectShop = (shop: any) => {
    setSelectedShop(shop);
  };
  const updateQuantity = (shopName: any, productId: any, delta: any) => {
    setCart((prevCart) =>
      prevCart
        .map((shop) => {
          if (shop.shopId !== shopName) return shop;
          return {
            ...shop,
            products: shop.products
              .map((product) =>
                product._id === productId
                  ? {
                      ...product,
                      quantity: Math.max(0, product.quantity + delta),
                    }
                  : product
              )
              .filter((product) => product.quantity > 0),
          };
        })
        .filter((shop) => shop.products.length > 0)
    );
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
                    onClick={() => updateQuantity(shop.shopId, product._id, -1)}
                    disabled={product.quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-6 text-center">
                    {product.purchaseQuantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(shop.shopId, product._id, 1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    updateQuantity(shop.shopId, product._id, -product.quantity)
                  }
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
