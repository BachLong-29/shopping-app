import commonMessage from "../core/messages/common.js";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Đường dẫn tới các file JSON
const enFilePath = path.join(__dirname, "../locales/en.json");
const viFilePath = path.join(__dirname, "../locales/vi.json");

// Đọc nội dung của các file JSON (nếu có)
const readJsonFile = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (error) {
    console.error(`Lỗi khi đọc file ${filePath}:`, error);
    return {}; // Trả về object rỗng nếu file không tồn tại hoặc không hợp lệ
  }
};

// Cập nhật các file JSON
const updateJsonFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

// Hàm đệ quy để merge dữ liệu mới vào dữ liệu cũ
const deepMerge = (target, source) => {
  for (const key in source) {
    if (typeof source[key] === "object" && !Array.isArray(source[key])) {
      // Nếu là object, tiếp tục đệ quy để giữ cấu trúc
      target[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      // Nếu là giá trị string, thêm vào nếu chưa có
      if (!target.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};

// Hàm thêm các giá trị từ commonMessage vào các file JSON
const addTranslations = () => {
  // Đọc dữ liệu hiện tại từ file JSON
  const enTranslations = readJsonFile(enFilePath);
  const viTranslations = readJsonFile(viFilePath);

  // Merge dữ liệu với các file JSON hiện có
  deepMerge(enTranslations, commonMessage);
  deepMerge(viTranslations, commonMessage);

  // Ghi lại vào file JSON
  updateJsonFile(enFilePath, enTranslations);
  updateJsonFile(viFilePath, viTranslations);

  console.log("Đã cập nhật bản dịch vào en.json và vi.json");
};

// Chạy cập nhật
addTranslations();
