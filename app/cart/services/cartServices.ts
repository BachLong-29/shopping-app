import { CartItem } from "@/core/model/Cart";
import HttpService from "@/core/services/httpService";

class CartService extends HttpService {
  async getCart(userId: { userId: string }): Promise<{
    userId: string;
    items: CartItem[];
  }> {
    const res = await this.get(`/api/${userId}/cart`, {});
    return res.cart;
  }

  async getTotal(userId: string): Promise<{
    total: number;
    productIds: string[];
  }> {
    const res = await this.get(`/api/${userId}/cart/total`, {});
    return res;
  }

  addToCart({
    userId,
    productId,
    quantity,
  }: {
    userId: string;
    productId: string;
    quantity: number;
  }) {
    return this.post(`/api/${userId}/cart/add`, {
      productId,
      quantity: quantity ?? 1,
    });
  }

  removeFromCart({ userId, productId }: { userId: string; productId: string }) {
    return this.delete(`/api/${userId}/cart`, { productId });
  }

  updateCart({
    userId,
    productId,
    quantity,
  }: {
    userId: string;
    productId: string;
    quantity: number;
  }) {
    return this.put(`/api/${userId}/cart`, {
      productId,
      quantity: quantity,
    });
  }
}

const cartService = new CartService();

export default cartService;
