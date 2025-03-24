import { Product } from "./Product";
import { UserInfo } from "./User";

export interface CartItem {
  productId: string;
  product: Product & {
    owner: UserInfo;
  };
  quantity: number; // purchaseQuantity
}

export interface CartByOwner {
  shop: {
    id: string;
    name: string;
    avatar: string;
  };
  products: (Product & {
    purchaseQuantity: number;
  })[];
}
