import { Product } from "./Product";
import { UserInfo } from "./User";

export interface SalesOrder {
  _id: string;
  user: UserInfo;
  products: Product;
  status: SalesOrderStatus;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export enum SalesOrderStatus {
  Completed = "available",
  Draft = "draft",
  Pending = "pending",
  Cancelled = "inactive",
}
