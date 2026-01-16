import Banner from "@/components/layout/Banner";
import CategoriesSection from "@/components/layout/categories/CategoriesSection";
import ProductionSection from "@/components/layout/product/ProductionSection";
import { getProductMKP } from "./action";

const categories = [
  {
    id: "1",
    name: "Electronics",
    image: "/images/product.jpg",
  },
  { id: "2", name: "Fashion", image: "/images/product.jpg" },
  { id: "3", name: "Home & Living", image: "/images/product.jpg" },
  { id: "4", name: "Beauty & Health", image: "/images/product.jpg" },
  {
    id: "5",
    name: "Sports & Outdoors",
    image: "/images/product.jpg",
  },
  {
    id: "6",
    name: "Toys & Games",
    image: "/images/product.jpg",
  },
  {
    id: "7",
    name: "Mini v3",
    image: "/images/product.jpg",
  },
];

const Home = async () => {
  const products = await getProductMKP();
  return (
    <div className="space-y-10 p-4 container mx-auto">
      <Banner />
      {/* <CategoriesSection data={categories} /> */}
      <ProductionSection data={products} />
    </div>
  );
};

export default Home;
