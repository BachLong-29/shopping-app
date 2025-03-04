/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import withMyTask from "@/components/forms/withMyTask";

const categories = [
  {
    name: "Electronics",
    image: "/images/banner1.jpg",
  },
  { name: "Fashion", image: "/images/banner1.jpg" },
  { name: "Home & Living", image: "/images/banner1.jpg" },
  {
    name: "Beauty & Health",
    image: "/images/banner1.jpg",
  },
  {
    name: "Sports & Outdoors",
    image: "/images/banner1.jpg",
  },
  { name: "Toys & Games", image: "/images/banner1.jpg" },
];

const fetchProducts = async (page: number) => {
  return new Array(32).fill(0).map((_, i) => ({
    id: (page - 1) * 32 + i + 1,
    name: `Product ${(page - 1) * 32 + i + 1}`,
    price: `$${(Math.random() * 100).toFixed(2)}`,
    image: `/images/banner1.jpg`,
  }));
};

const Home = () => {
  const [products, setProducts] = useState<any>([]);
  const [page, setPage] = useState(1);
  const totalPages = 10;

  useEffect(() => {
    fetchProducts(page).then((res) => setProducts(res));
  }, [page]);

  return (
    <div className="space-y-10 p-4 container mx-auto">
      <Carousel className="relative w-full max-w-[1472px] max-h-[450px] mx-auto">
        <CarouselContent>
          {[1, 2, 3, 4].map((i) => (
            <CarouselItem key={i} className="h-[450px]">
              <Image
                src={`/images/banner${i}.jpg`}
                alt="Banner"
                width={1472}
                height={450}
                className="rounded-xl w-full h-full "
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-[25px]" />
        <CarouselNext className="absolute right-[25px]" />
      </Carousel>

      <div>
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md cursor-pointer"
            >
              <Image
                src={category.image}
                alt={category.name}
                width={100}
                height={100}
                className="rounded-full"
              />
              <span className="mt-2 text-sm font-medium">{category.name}</span>
            </div>
          ))}
          <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer">
            <Plus size={24} />
            <span className="mt-2 text-sm font-medium">More</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">All Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {products.map((product: any) => (
            <Card key={product.id} className="p-2 shadow-md rounded-lg">
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
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            <ChevronLeft size={16} /> Prev
          </Button>
          <span className="mx-4 text-lg font-semibold">
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withMyTask(Home);
