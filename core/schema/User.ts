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
  bio?: string;
  username?: string;
  title?: string;
  nationality?: string;
  phone2?: string;
  emergency?: string;
  languages?: string[];
  timezone?: string;
  district?: string;
  state?: string;
  city?: string;
  postal?: string;
  country?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  preferences?: {
    theme: string;
    language: string;
    orderUpdates: boolean;
    productNews: boolean;
    marketingEmails: boolean;
    publicProfile: boolean;
    showActivity: boolean;
    searchable: boolean;
  };
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "seller", "user"], default: "user" },
    avatar: { type: String },
    address: { type: String, default: "" },
    gender: { type: String, default: "" },
    phone: { type: String },
    birthdate: { type: String },
    bio: { type: String },
    username: { type: String },
    title: { type: String },
    nationality: { type: String },
    phone2: { type: String },
    emergency: { type: String },
    languages: { type: [String], default: [] },
    timezone: { type: String },
    district: { type: String },
    state: { type: String },
    city: { type: String },
    postal: { type: String },
    country: { type: String },
    website: { type: String },
    linkedin: { type: String },
    github: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    facebook: { type: String },
    preferences: {
      type: {
        theme: { type: String, default: "System" },
        language: { type: String, default: "English" },
        orderUpdates: { type: Boolean, default: true },
        productNews: { type: Boolean, default: true },
        marketingEmails: { type: Boolean, default: false },
        publicProfile: { type: Boolean, default: true },
        showActivity: { type: Boolean, default: false },
        searchable: { type: Boolean, default: true },
      },
      default: () => ({
        theme: "System",
        language: "English",
        orderUpdates: true,
        productNews: true,
        marketingEmails: false,
        publicProfile: true,
        showActivity: false,
        searchable: true,
      }),
    },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
