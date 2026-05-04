import mongoose, { Document, Schema } from "mongoose";

import User from "./User";

export interface ISetting extends Document {
  userId: mongoose.Types.ObjectId;
  address: {
    country?: string;
    city?: string;
    street?: string;
    postalCode?: string;
  };

  theme: "light" | "dark" | "system";

  language: string;

  createdAt: Date;
  updatedAt: Date;
}

const SettingSchema = new Schema<ISetting>(
  {
    userId: { type: Schema.Types.ObjectId, ref: User, required: true },
    address: {
      country: { type: String },
      city: { type: String },
      street: { type: String },
      postalCode: { type: String },
    },

    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },

    language: {
      type: String,
      default: "vi",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Settings ||
  mongoose.model<ISetting>("Settings", SettingSchema);
