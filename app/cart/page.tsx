import CarList from "./component/CarList";
import { CartProvider } from "./context/CartContext";
import Checkout from "./component/Checkout";
import { Product } from "@/core/model/Product";
import cartService from "./services/cartServices";
import { cookies } from "next/headers";
import { defaultAvatar } from "@/core/utils/common";
import { verifyAccessToken } from "@/lib/auth";
import { redirect } from "next/navigation";

const CartPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const user = token ? verifyAccessToken(token) : null;

  if (!user) {
    redirect("/login");
  }

  const dataCart = await cartService.getCart(user._id);
  const mapDataCart = Object.values(
    dataCart?.items?.reduce<
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
    }, {}),
  );

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <CartProvider cartData={mapDataCart}>
        <CarList />
        <Checkout />
      </CartProvider>
    </div>
  );
};

export default CartPage;
