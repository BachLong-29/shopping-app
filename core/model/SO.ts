import { Product } from "./Product";
import { UserInfo } from "./User";

export interface SalesOrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface SalesOrder {
  _id: string;
  user: UserInfo;
  products: Product;
  items?: SalesOrderItem[];
  status: SalesOrderStatus;
  totalAmount: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export enum SalesOrderStatus {
  Completed = "available",
  Draft = "draft",
  Pending = "pending",
  Cancelled = "inactive",
}
