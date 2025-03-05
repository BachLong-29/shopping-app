import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Product } from "./ProductionSection";
import React from "react";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="p-2 shadow-md rounded-lg">
      <CardContent className="flex flex-col items-center">
        <Image
          src={product.image}
          alt={product.name}
          width={150}
          height={150}
          className="object-cover rounded-lg"
        />
        <span className="mt-2 text-sm font-medium text-center">
          {product.name}
        </span>
        <Badge className="mt-1 text-xs">{product.price}</Badge>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
