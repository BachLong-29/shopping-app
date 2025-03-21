import CarList from "./component/CarList";
import Checkout from "./component/Checkout";
import { Product } from "@/core/model/Product";
import cartService from "./services/cartServices";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export default async function CartPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = verifyToken(token); // Giải mã token để lấy user
  const data = await cartService.getCart(user._id);
  const mapData = Object.values(
    data.items.reduce<
      Record<
        string,
        { shopId: string; products: (Product & { purchaseQuantity: number })[] }
      >
    >((acc, curr) => {
      const shopId = curr.product.ownerId;

      if (!acc[shopId]) {
        acc[shopId] = {
          shopId,
          products: [],
        };
      }

      acc[shopId].products.push({
        ...curr.product,
        purchaseQuantity: curr.quantity,
      });

      return acc;
    }, {})
  );
  return (
    <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <CarList data={mapData} />
      <Checkout />
    </div>
  );
}
