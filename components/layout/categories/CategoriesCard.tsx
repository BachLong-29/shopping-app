import { Card, CardContent } from "@/components/ui/card";

import Image from "next/image";
import React from "react";

const CategoriesCard = ({
  category,
}: {
  category: { id: string; name: string; image: string };
}) => {
  return (
    <Card className="p-2 shadow-md rounded-lg">
      <CardContent className="flex flex-col items-center p-0">
        <Image
          src={category.image}
          alt={category.name}
          width={100}
          height={100}
          className="rounded-lg"
        />
        <span className="mt-2 text-sm font-medium">{category.name}</span>
      </CardContent>
    </Card>
  );
};

export default CategoriesCard;
