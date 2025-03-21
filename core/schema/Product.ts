import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  ownerId: string;
  description?: string;
  status: string;
  quantity: number;
  images?: string[];
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    ownerId: { type: String, required: true },
    status: { type: String, required: true },
    images: Array<string>,
    quantity: Number,
    description: String,
    // rating
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
