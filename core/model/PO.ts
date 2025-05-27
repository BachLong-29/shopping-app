import { Product } from "./Product";
import { UserInfo } from "./User";

export interface PurchaseOrder {
  _id: string;
  user: UserInfo;
  products: Product;
  status: PurchaseOrderStatus;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export enum PurchaseOrderStatus {
  Completed = "available",
  Pending = "pending",
  Cancelled = "inactive",
}
