export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  status: ProductStatus;
  description: string;
  quantity: number;
}

export enum ProductStatus {
  Available = "available",
  OutOfStock = "out_of_stock",
  Draft = "draft",
  Inactive = "inactive",
}
