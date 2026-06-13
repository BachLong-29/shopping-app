import mongoose, { Document, Schema } from "mongoose";

interface ShippingAddress {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state?: string;
  postal?: string;
  country?: string;
}

export interface IOrder extends Document {
  seller: mongoose.Types.ObjectId;
  products: { product: mongoose.Types.ObjectId; quantity: number }[];
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  shippingAddress?: ShippingAddress;
  paymentMethod?: string;
}

const PurchaseOrderSchema = new Schema<IOrder>(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    shippingAddress: {
      name: String,
      phone: String,
      email: String,
      address: String,
      city: String,
      state: String,
      postal: String,
      country: String,
    },
    paymentMethod: { type: String, default: "cod" },
  },
  { timestamps: true }
);

export default mongoose.models.Purchase_Order ||
  mongoose.model<IOrder>("Purchase_Order", PurchaseOrderSchema);
