import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  ownerId: string;
  // seller: mongoose.Types.ObjectId; // Chủ sở hữu sản phẩm (seller)
  description?: string;
  status: string;
  quantity: number;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    // seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ownerId: { type: String, required: true },
    status: { type: String, required: true },
    quantity: Number,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
