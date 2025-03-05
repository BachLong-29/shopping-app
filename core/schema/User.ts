import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "seller" | "user";
  avatar: string;
  address: string;
  gender: string;
  phone: number;
  birthdate: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "seller", "user"], default: "user" },
    avatar: { type: String, default: "" },
    address: { type: String, default: "" },
    gender: { type: String, default: "" },
    phone: { type: Number },
    birthdate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
