import Image from "next/image";
import React from "react";

const CategoriesCard = ({
  category,
}: {
  category: { id: string; name: string; image: string };
}) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md cursor-pointer">
      <Image
        src={category.image}
        alt={category.name}
        width={100}
        height={100}
        className="rounded-full"
      />
      <span className="mt-2 text-sm font-medium">{category.name}</span>
    </div>
  );
};

export default CategoriesCard;
