import { Product } from "./Product";

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number; // purchaseQuantity
}

export interface CartByOwner {
  shopId: string;
  products: (Product & {
    purchaseQuantity: number;
  })[];
}
