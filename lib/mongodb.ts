import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("❌ MongoDB URI không được tìm thấy trong .env.local");
}

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("✅ Đã kết nối MongoDB (cached)");
      return;
    }

    await mongoose.connect(MONGODB_URI, {
      dbName: "my_database", // Đổi tên DB nếu cần
    });

    console.log("✅ Kết nối MongoDB thành công");
  } catch (error) {
    console.error("❌ Lỗi kết nối MongoDB:", error);
    throw error;
  }
};
