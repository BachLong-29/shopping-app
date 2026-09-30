export interface Product {
  _id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  status: ProductStatus;
  description?: string;
  quantity: number;
  category?: string;
  createdAt?: string;
  sku?: string;
  ownerId: string;
  images?: string[];
  rating?: number;
  reviewCount?: number;
}

export enum ProductStatus {
  Available = "available",
  OutOfStock = "out_of_stock",
  Draft = "draft",
  Inactive = "inactive",
}
