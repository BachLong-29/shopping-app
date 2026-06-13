import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Product } from "@/core/model/Product";
import { defaultAvatar } from "@/core/utils/common";
import { verifyAccessToken, verifyRefreshToken } from "@/lib/auth";
import cartService from "./services/cartServices";
import { CartProvider } from "./context/CartContext";
import CartView from "./component/CartView";

const CartPage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  // Mirror the middleware logic: either token counts as authenticated.
  // If only the refresh token is valid the client-side Axios interceptor
  // will issue a new access token on the first API call.
  const user =
    (accessToken ? verifyAccessToken(accessToken) : null) ??
    (refreshToken ? verifyRefreshToken(refreshToken) : null);

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
    }, {})
  );

  return (
    <CartProvider cartData={mapDataCart} currentUserId={user._id}>
      <CartView />
    </CartProvider>
  );
};

export default CartPage;
