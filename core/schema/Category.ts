import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  seller: mongoose.Types.ObjectId; // Chủ sở hữu ngành hàng (seller)
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },

    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
