import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "seller" | "user";
  avatar: string;
  address: string;
  gender: string;
  phone: string;
  birthdate: Date | string;
}

const UserSchema = new Schema<IUser>(
  {
    // _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "seller", "user"], default: "user" },
    avatar: { type: String },
    address: { type: String, default: "" },
    gender: { type: String, default: "" },
    phone: { type: String },
    birthdate: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
