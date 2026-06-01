import Banner from "@/components/layout/Banner";
import FeaturesStrip from "@/components/layout/FeaturesStrip";
import BestSellersSection from "@/components/layout/home/BestSellersSection";
import BrowseSection from "@/components/layout/home/BrowseSection";
import CategoriesSection from "@/components/layout/home/CategoriesSection";
import FeaturedProductsSection from "@/components/layout/home/FeaturedProductsSection";
import FlashSaleSection from "@/components/layout/home/FlashSaleSection";
import HorizontalCarousel from "@/components/layout/home/HorizontalCarousel";
import NewsletterSection from "@/components/layout/home/NewsletterSection";
import TestimonialsSection from "@/components/layout/home/TestimonialsSection";
import ProductionSection from "@/components/layout/product/ProductionSection";
import { getProductMKP } from "./action";

const Home = async () => {
  const products = await getProductMKP();

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* Hero */}
      <Banner />

      {/* Features strip */}
      <FeaturesStrip />

      {/* Shop by category */}
      <CategoriesSection />

      {/* Real products from API — Featured / Top seller */}
      <ProductionSection data={products} />

      {/* Featured this week (dummy) */}
      <FeaturedProductsSection />

      {/* Flash sale */}
      <FlashSaleSection />

      {/* Trending right now (dummy carousel) */}
      <HorizontalCarousel sectionKey="trending" />

      {/* Best sellers */}
      <BestSellersSection />

      {/* Browse everything */}
      <BrowseSection />

      {/* Recommended for you (dummy carousel) */}
      <HorizontalCarousel sectionKey="recommended" />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );

};

export default Home;
