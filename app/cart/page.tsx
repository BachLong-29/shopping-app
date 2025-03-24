import CarList from "./component/CarList";
import { CartProvider } from "./context/CartContext";
import Checkout from "./component/Checkout";
import { Product } from "@/core/model/Product";
import cartService from "./services/cartServices";
import { cookies } from "next/headers";
import { defaultAvatar } from "@/core/utils/common";
import { verifyToken } from "@/lib/auth";

export default async function CartPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = verifyToken(token);
  const data = await cartService.getCart(user._id);
  const mapData = Object.values(
    data.items.reduce<
      Record<
        string,
        {
          shop: { id: string; name: string; avatar: string };
          products: (Product & { purchaseQuantity: number })[];
        }
      >
    >((acc, curr) => {
      const { ownerId, owner } = curr.product;

      if (!acc[ownerId]) {
        acc[ownerId] = {
          shop: {
            id: ownerId,
            name: owner.name,
            avatar: owner.avatar ?? defaultAvatar,
          },
          products: [],
        };
      }

      acc[ownerId].products.push({
        ...curr.product,
        purchaseQuantity: curr.quantity,
      });

      return acc;
    }, {})
  );

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <CartProvider cartData={mapData}>
        <CarList />
        <Checkout />
      </CartProvider>
    </div>
  );
}
