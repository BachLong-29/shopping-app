import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  seller: mongoose.Types.ObjectId;
  products: { product: mongoose.Types.ObjectId; quantity: number }[];
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
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
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Ai mua hàng
  },
  { timestamps: true }
);

export default mongoose.models.Purchase_Order ||
  mongoose.model<IOrder>("Purchase_Order", PurchaseOrderSchema);
