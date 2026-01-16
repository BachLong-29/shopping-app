import Banner from "@/components/layout/Banner";
import ProductionSection from "@/components/layout/product/ProductionSection";
import { getProductMKP } from "./action";

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
