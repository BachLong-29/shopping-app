import { ProductStatus } from "@/core/model/Product";
import React from "react";
import { useLanguage } from "@/core/context/LanguageContext";

const ProductStatusTag = ({ value }: { value: ProductStatus }) => {
  const statusColor = {
    [ProductStatus.Available]: "bg-green-500",
    [ProductStatus.Draft]: "bg-gray-500",
    [ProductStatus.OutOfStock]: "bg-red-500",
    [ProductStatus.Inactive]: "bg-red-500",
  };
  const { t } = useLanguage();
  return (
    <div
      className={`w-[fit-content] text-center px-2 py-1 rounded-xl text-white ${statusColor[value]}`}
    >
      {t(`product.status.${value}`)}
    </div>
  );
};

export default ProductStatusTag;
