// Upload images in temp/categories to Cloudinary and print the resulting URLs.
// Usage: node --env-file=.env scripts/upload-categories.js
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, "../temp/categories");
const FOLDER = "shopping-app/categories";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
if (!cloudName || !apiKey || !apiSecret) throw new Error("Thiếu biến CLOUDINARY_* trong .env");

const upload = async (file) => {
  const publicId = path.parse(file).name;
  const timestamp = Math.floor(Date.now() / 1000);
  const params = { folder: FOLDER, overwrite: "true", public_id: publicId, timestamp };
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  const signature = crypto.createHash("sha1").update(toSign + apiSecret).digest("hex");

  const form = new FormData();
  Object.entries({ ...params, api_key: apiKey, signature }).forEach(([k, v]) => form.append(k, String(v)));
  form.append("file", new Blob([fs.readFileSync(path.join(DIR, file))]), file);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: form });
  const json = await res.json();
  if (!res.ok) throw new Error(`${file}: ${json.error?.message ?? res.status}`);
  return json.secure_url;
};

const files = fs.readdirSync(DIR).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
const result = {};
for (const file of files) {
  result[path.parse(file).name] = await upload(file);
  console.log("✅", file, "→", result[path.parse(file).name]);
}
console.log(JSON.stringify(result, null, 2));
