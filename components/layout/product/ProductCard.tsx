import { Card, CardContent } from "@/components/ui/card";

import HeartButton from "./HeartButton";
import Image from "next/image";
import { Product } from "@/core/model/Product";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  return (
    <Card className="p-2 shadow-md rounded-lg border border-gray-200 transition-all duration-300 hover:border-pink-500 hover:scale-105">
      <CardContent className="flex flex-col items-start p-0">
        <Image
          src={product.images?.[0] ?? "/images/product.jpg"}
          alt={product.name}
          width={165}
          height={165}
          className="rounded-lg w-full cursor-pointer"
          onClick={() => router.push(`/prod/${product._id}`)}
        />
        <span className="mt-2 text-sm font-medium text-center">
          {product.name}
        </span>
        <div className="flex w-full items-center justify-between">
          <div>₫{product.price.toLocaleString("vi-VN")}</div>
          <HeartButton />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
