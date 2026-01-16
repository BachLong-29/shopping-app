import { Card, CardContent } from "@/components/ui/card";

import cartService from "@/app/cart/services/cartServices";
import { Product } from "@/core/model/Product";
import { addToCart } from "@/redux/reducer/cartReducer";
import { RootState } from "@/redux/store/store";
import { ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import HeartButton from "./HeartButton";
import { useLanguage } from "@/core/context/LanguageContext";

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const userId = useSelector((state: RootState) => state.profile._id);
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const handleAddToCart = async () => {
    if (userId) {
      toast.success(t("product.message.updare_cart"), {
        description: (
          <span className="text-black">{t("product.message.add_to_cart")}</span>
        ),
        duration: 3000,
      });
      await cartService.addToCart({
        productId: product._id,
        userId,
        quantity: 1,
      });
      dispatch(addToCart(product._id));
    } else {
      router.push("/login");
    }
  };

  return (
    <Card className="relative rounded-lg border-0 bg-gray-200 dark:bg-[#202020] transition-all duration-300 hover:scale-105">
      <CardContent className="flex flex-col items-start p-0">
        <div className="absolute top-2 right-2 bg-[#f5f5f5] rounded-full">
          <HeartButton />
        </div>
        <Image
          src={product.images?.[0] ?? "/images/product.jpg"}
          alt={product.name}
          width={165}
          height={165}
          className="rounded-t-lg w-full cursor-pointer"
          onClick={() => router.push(`/prod/${product._id}`)}
        />

        <div className="w-full p-2">
          <p className="w-full truncate">{product.name}</p>
          <div className="flex justify-between items-center">
            <span className="mt-2 text-lg font-medium text-center">
              ₫{product.price.toLocaleString("vi-VN")}
            </span>
            <div
              onClick={handleAddToCart}
              className="bg-[#202020] dark:bg-[#f5f5f5] p-1 cursor-pointer rounded-lg"
            >
              <ShoppingBasket
                size={20}
                className="dark:text-[#202020] text-white"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
