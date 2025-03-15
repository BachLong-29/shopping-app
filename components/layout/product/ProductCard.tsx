import { Card, CardContent } from "@/components/ui/card";

import HeartButton from "./HeartButton";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductCard = ({
  product,
}: {
  product: {
    id: string | number;
    name: string;
    price: string;
    image: string;
  };
}) => {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`/prod/${product.id}`)}
      className="p-2 shadow-md rounded-lg border border-gray-200 transition-all duration-300 hover:border-pink-500 cursor-pointer hover:scale-105"
    >
      <CardContent className="flex flex-col items-start p-0">
        <Image
          src={product.image}
          alt={product.name}
          width={165}
          height={165}
          className="rounded-lg w-full"
        />
        <span className="mt-2 text-sm font-medium text-center">
          {product.name}
        </span>
        <div className="flex w-full items-center justify-between">
          <div>{product.price}</div>
          <HeartButton />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
