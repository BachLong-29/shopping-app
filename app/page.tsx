/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Banner from "@/components/layout/Banner";
import CategoriesSection from "@/components/layout/categories/CategoriesSection";
import ProductionSection from "@/components/layout/product/ProductionSection";
import { useState } from "react";
import withMyTask from "@/components/forms/withMyTask";

const categories = [
  {
    id: "1",
    name: "Electronics",
    image: "/images/banner1.jpg",
  },
  { id: "2", name: "Fashion", image: "/images/banner1.jpg" },
  { id: "3", name: "Home & Living", image: "/images/banner1.jpg" },
  { id: "4", name: "Beauty & Health", image: "/images/banner1.jpg" },
  {
    id: "5",
    name: "Sports & Outdoors",
    image: "/images/banner1.jpg",
  },
  {
    id: "6",
    name: "Toys & Games",
    image: "/images/banner1.jpg",
  },
  {
    id: "7",
    name: "Mini v3",
    image: "/images/banner1.jpg",
  },
];

const Home = () => {
  const [products, setProducts] = useState<any>([]);

  return (
    <div className="space-y-10 p-4 container mx-auto">
      <Banner />
      <CategoriesSection data={categories} />
      <ProductionSection data={products} setProducts={setProducts} />
    </div>
  );
};

export default withMyTask(Home);
