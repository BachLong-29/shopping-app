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
import { getHomeProducts, getProductMKP } from "./action";

const Home = async () => {
  const [products, home] = await Promise.all([
    getProductMKP(),
    getHomeProducts(),
  ]);
  const byReviews = [...home.products].sort((a, b) => b.reviews - a.reviews);
  const byRating = [...home.products].sort((a, b) => b.rating - a.rating);

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

      {/* Featured this week */}
      <FeaturedProductsSection products={home.products} total={home.total} />

      {/* Flash sale: products with an originalPrice */}
      <FlashSaleSection products={home.products} />

      {/* Trending right now: most reviewed */}
      <HorizontalCarousel sectionKey="trending" products={byReviews.slice(0, 12)} />

      {/* Best sellers */}
      <BestSellersSection products={home.products} />

      {/* Browse everything */}
      <BrowseSection products={home.products} />

      {/* Recommended for you: top rated */}
      <HorizontalCarousel sectionKey="recommended" products={byRating.slice(0, 12)} />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );

};

export default Home;
