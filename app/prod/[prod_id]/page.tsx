"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import withMyTask from "@/components/forms/withMyTask";

const ProductDetail = () => {
  const [liked, setLiked] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = {
    name: "Apple iPhone 15 Pro Max",
    price: "29,990,000 VND",
    images: [
      "/images/product.jpg",
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    rating: 4.8,
    reviews: 1520,
    description:
      "Apple iPhone 15 Pro Max sử dụng chip A17 Pro mạnh mẽ, màn hình ProMotion 120Hz, thiết kế Titanium siêu nhẹ, và hệ thống camera cải tiến.",
    specifications: {
      display: "6.7-inch Super Retina XDR",
      chip: "A17 Pro",
      camera: "48MP + 12MP + 12MP",
      battery: "4,422 mAh",
      os: "iOS 17",
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeImage = (direction: any) => {
    if (direction === "next") {
      setSelectedImageIndex(
        (prevIndex) => (prevIndex + 1) % product.images.length
      );
    } else if (direction === "prev") {
      setSelectedImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + product.images.length) % product.images.length
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="p-4 shadow-lg rounded-lg">
        <CardContent className="flex flex-col md:flex-row gap-4 p-0">
          {/* Ảnh sản phẩm */}
          <div className="flex flex-col items-center relative">
            <Image
              src={product.images[selectedImageIndex]}
              alt={product.name}
              width={400}
              height={400}
              className="rounded-lg w-full "
            />
            {/* Nút chuyển ảnh */}
            <button
              onClick={() => changeImage("prev")}
              className="absolute left-[8px] top-[50%] transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
            >
              &#10094;
            </button>
            <button
              onClick={() => changeImage("next")}
              className="absolute right-[8px] top-[50%] transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
            >
              &#10095;
            </button>
            {/* Thumbnail ảnh */}
            <div className="flex space-x-2 mt-2">
              {product.images.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={product.name}
                  width={80}
                  height={80}
                  className={`cursor-pointer rounded-lg border-2 ${
                    selectedImageIndex === index
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Thông tin sản phẩm */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-xl font-semibold text-red-500">
                {product.price}
              </span>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} đánh giá)
                </span>
              </div>
            </div>

            {/* Mô tả sản phẩm */}
            <p className="text-gray-600 mt-4">{product.description}</p>

            {/* Thông số kỹ thuật */}
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Thông số kỹ thuật</h2>
              <ul className="mt-2 space-y-1 text-gray-700">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key} className="flex justify-between">
                    <span className="font-medium capitalize">{key}:</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nút mua hàng */}
            <div className="mt-6 flex items-center space-x-4">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2">
                Thêm vào giỏ hàng
              </Button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: liked ? 1.1 : 1,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="p-2 rounded-full transition-all duration-300"
                onClick={() => setLiked(!liked)}
              >
                <Heart
                  className="w-6 h-6 transition-all duration-300"
                  fill={liked ? "#ff4081" : "transparent"}
                  color={liked ? "#ff4081" : "gray"}
                  strokeWidth={liked ? 0 : 2}
                />
              </motion.button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Sản phẩm liên quan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Danh sách sản phẩm liên quan */}
          {[1, 2, 3, 4].map((_, index) => (
            <Card
              key={index}
              className="p-2 shadow-md rounded-lg border border-gray-200 transition-all duration-300 hover:border-blue-500 cursor-pointer hover:scale-105"
            >
              <CardContent className="flex flex-col items-start p-0">
                <Image
                  src="/images/product.jpg"
                  alt="Sản phẩm liên quan"
                  width={150}
                  height={150}
                  className="rounded-lg w-full"
                />
                <span className="mt-2 text-sm font-medium text-center">
                  Sản phẩm {index + 1}
                </span>
                <div className="flex w-full items-center justify-between">
                  <div className="text-red-500 font-semibold">9,990,000 đ</div>
                  <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-all cursor-pointer" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withMyTask(ProductDetail);
