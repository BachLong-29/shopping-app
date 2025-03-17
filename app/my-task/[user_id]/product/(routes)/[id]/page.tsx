"use client";

import { use, useEffect, useState } from "react";

import Image from "next/image";
import ProductStatusTag from "@/components/layout/product/ProductStatusTag";
import WrapperContent from "@/components/layout/section/WrapperContent";
import { useBreadcrumb } from "@/core/context/BreadcrumbContext";
import { useLanguage } from "@/core/context/LanguageContext";
import { useProductDetail } from "../../context/ProductDetailContext";
import withMyTask from "@/components/forms/withMyTask";

const images = [
  "/images/product.jpg",
  "/images/product1.jpg",
  "/images/product2.jpg",
];

const ProductDetailPage = ({
  params,
}: {
  params: Promise<{ user_id: string; id: string }>;
}) => {
  const { user_id: userId, id: productId } = use(params);

  const { product } = useProductDetail();
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const { setBreadcrumb } = useBreadcrumb();
  const { t } = useLanguage();
  useEffect(() => {
    setBreadcrumb([
      {
        label: t("module.product"),
        href: `/my-task/${userId}/product`,
      },
      {
        label: productId,
      },
    ]);
  }, []);
  return (
    <WrapperContent>
      <div className="flex gap-8 p-8 max-w-6xl mx-auto">
        <div className="flex flex-col items-center w-1/2">
          <Image
            src={selectedImage}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover rounded-2xl transition-all duration-300 ease-in-out"
          />

          <p className="text-2xl font-semibold mt-4">{product.name}</p>
          <p className="text-gray-500 mt-2">{product.description}</p>

          <div className="flex gap-4 mt-4">
            {images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt="Thumbnail"
                width={80}
                height={80}
                className={`object-cover rounded-xl cursor-pointer transition-all duration-300 ease-in-out ${
                  selectedImage === img ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="w-1/2 space-y-6">
          <h2 className="text-3xl font-bold">${product.price}</h2>
          <ProductStatusTag value={product.status} />
          <p className="text-gray-700">
            Category: {product.category || "Uncategorized"}
          </p>
          <p className="text-gray-700">Quantity: {product.quantity}</p>
        </div>
      </div>
    </WrapperContent>
  );
};

export default withMyTask(ProductDetailPage);
