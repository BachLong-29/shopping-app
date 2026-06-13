import mongoose, { Document, Schema } from "mongoose";
import User from "./User";

export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  ownerId: Schema.Types.ObjectId;
  description?: string;
  status: string;
  quantity: number;
  images?: string[];
  rating?: number;
  reviewCount?: number;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: User, required: true },
    status: { type: String, required: true },
    images: Array<string>,
    quantity: Number,
    description: String,
    rating: { type: Number },
    reviewCount: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
