// Seed 10 categories + 100 products, spread evenly across existing users.
// Usage: npm run seed            (asks for confirmation)
//        npm run seed -- --yes   (skip confirmation)
import mongoose from "mongoose";
import readline from "readline";

const DB_NAME = "my_database"; // keep in sync with lib/mongodb.ts

const CATALOG = {
  "Thời trang nam": [
    ["Áo thun cotton basic", 149000],
    ["Áo sơ mi Oxford tay dài", 359000],
    ["Quần jeans slim fit", 459000],
    ["Quần kaki ống đứng", 399000],
    ["Áo khoác bomber", 549000],
    ["Áo polo pique", 259000],
    ["Quần short thể thao", 189000],
    ["Áo hoodie nỉ bông", 429000],
    ["Thắt lưng da bò", 299000],
    ["Áo vest công sở", 1290000],
  ],
  "Thời trang nữ": [
    ["Đầm midi hoa nhí", 429000],
    ["Áo kiểu tay phồng", 289000],
    ["Chân váy chữ A", 249000],
    ["Quần culottes lưng cao", 319000],
    ["Áo len cổ lọ", 349000],
    ["Áo khoác blazer", 699000],
    ["Đầm dạ hội satin", 1190000],
    ["Set đồ ngủ lụa", 379000],
    ["Áo croptop cotton", 159000],
    ["Khăn choàng cashmere", 459000],
  ],
  "Điện thoại & Phụ kiện": [
    ["Điện thoại Galaxy A55 128GB", 8990000],
    ["Điện thoại Redmi Note 13", 5490000],
    ["Ốp lưng silicon trong suốt", 79000],
    ["Kính cường lực full màn hình", 59000],
    ["Sạc nhanh 33W", 199000],
    ["Cáp USB-C bọc dù 1m", 89000],
    ["Pin dự phòng 10000mAh", 349000],
    ["Tai nghe Bluetooth TWS", 499000],
    ["Giá đỡ điện thoại để bàn", 99000],
    ["Gậy chụp ảnh selfie Bluetooth", 159000],
  ],
  "Máy tính & Laptop": [
    ["Laptop văn phòng 14 inch i5", 15990000],
    ["Laptop gaming RTX 4050", 24990000],
    ["Chuột không dây yên tĩnh", 229000],
    ["Bàn phím cơ TKL", 799000],
    ["Màn hình 24 inch IPS", 3290000],
    ["Webcam Full HD 1080p", 459000],
    ["Ổ cứng SSD 512GB NVMe", 1190000],
    ["USB 64GB 3.0", 129000],
    ["Balo laptop chống nước", 349000],
    ["Đế tản nhiệt laptop", 259000],
  ],
  "Đồ gia dụng": [
    ["Nồi chiên không dầu 5L", 1590000],
    ["Nồi cơm điện 1.8L", 1090000],
    ["Máy xay sinh tố đa năng", 690000],
    ["Ấm siêu tốc inox 1.7L", 289000],
    ["Bàn ủi hơi nước cầm tay", 499000],
    ["Máy hút bụi cầm tay", 1890000],
    ["Bộ nồi inox 3 món", 890000],
    ["Quạt đứng điều khiển từ xa", 1290000],
    ["Máy lọc không khí mini", 2490000],
    ["Bình giữ nhiệt 750ml", 199000],
  ],
  "Làm đẹp & Chăm sóc da": [
    ["Sữa rửa mặt dịu nhẹ", 159000],
    ["Kem chống nắng SPF50+", 249000],
    ["Serum vitamin C 20ml", 329000],
    ["Kem dưỡng ẩm phục hồi", 289000],
    ["Mặt nạ đất sét", 139000],
    ["Son lì lâu trôi", 189000],
    ["Nước tẩy trang micellar 400ml", 179000],
    ["Dầu gội thảo dược 500ml", 149000],
    ["Kem dưỡng tay hương hoa", 89000],
    ["Bộ cọ trang điểm 12 cây", 259000],
  ],
  "Thể thao & Dã ngoại": [
    ["Giày chạy bộ nhẹ", 899000],
    ["Thảm tập yoga 6mm", 199000],
    ["Tạ tay điều chỉnh 10kg", 549000],
    ["Bình nước thể thao 1L", 119000],
    ["Lều cắm trại 4 người", 1490000],
    ["Balo leo núi 40L", 790000],
    ["Vợt cầu lông carbon", 459000],
    ["Bóng đá số 5", 249000],
    ["Dây nhảy tốc độ", 69000],
    ["Găng tay tập gym", 139000],
  ],
  "Sách & Văn phòng phẩm": [
    ["Sổ tay bìa da A5", 99000],
    ["Bút gel mực đen (hộp 12)", 79000],
    ["Sách Nhà giả kim", 89000],
    ["Sách Đắc nhân tâm", 95000],
    ["Sách Clean Code", 259000],
    ["Bảng trắng treo tường 60x90", 249000],
    ["Bút highlight 6 màu", 59000],
    ["Kẹp giấy & ghim bấm combo", 39000],
    ["Máy tính Casio FX-580", 549000],
    ["Lịch để bàn 2026", 69000],
  ],
  "Đồ chơi & Mẹ bé": [
    ["Bộ xếp hình 500 mảnh", 349000],
    ["Gấu bông 60cm", 199000],
    ["Xe điều khiển từ xa", 429000],
    ["Bình sữa cổ rộng 240ml", 159000],
    ["Tã dán size M (68 miếng)", 249000],
    ["Nôi điện tự động ru", 1890000],
    ["Bộ đồ chơi nhà bếp mini", 229000],
    ["Sách vải cho bé", 129000],
    ["Xe đẩy gấp gọn", 1590000],
    ["Bảng vẽ tự xóa", 89000],
  ],
  "Thực phẩm & Đồ uống": [
    ["Cà phê rang xay 500g", 189000],
    ["Trà ô long túi lọc (hộp 25)", 99000],
    ["Mật ong rừng nguyên chất 500ml", 229000],
    ["Hạt điều rang muối 500g", 189000],
    ["Bánh quy bơ hộp thiếc", 149000],
    ["Nước mắm truyền thống 500ml", 69000],
    ["Mì Ý & sốt cà chua combo", 89000],
    ["Sữa hạt óc chó (thùng 24)", 399000],
    ["Trái cây sấy mix 300g", 129000],
    ["Dầu ô liu extra virgin 500ml", 259000],
  ],
};

const STATUSES = ["available", "available", "available", "available", "out_of_stock", "draft", "inactive"];

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const confirm = (question) =>
  new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === "y");
    });
  });

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Thiếu MONGODB_URI (chạy qua `npm run seed` để nạp .env)");

  await mongoose.connect(uri, { dbName: DB_NAME });
  const db = mongoose.connection.db;

  const users = await db.collection("users").find({}, { projection: { _id: 1, email: 1 } }).toArray();
  if (users.length === 0) throw new Error("Không có user nào trong DB, hãy tạo user trước.");

  const [oldProducts, oldCategories] = await Promise.all([
    db.collection("products").countDocuments(),
    db.collection("categories").countDocuments(),
  ]);

  console.log(`DB: ${DB_NAME}`);
  console.log(`Users: ${users.length}`);
  console.log(`Sẽ XÓA ${oldProducts} sản phẩm và ${oldCategories} category hiện có,`);
  console.log(`rồi tạo ${Object.keys(CATALOG).length} category + ${Object.keys(CATALOG).length * 10} sản phẩm.`);

  if (!process.argv.includes("--yes") && !(await confirm("Tiếp tục? (y/N) "))) {
    console.log("Đã huỷ.");
    return;
  }

  await Promise.all([db.collection("products").deleteMany({}), db.collection("categories").deleteMany({})]);

  const now = new Date();
  const categoryNames = Object.keys(CATALOG);

  // Category.name is globally unique, so each category has exactly one seller.
  const categories = categoryNames.map((name, i) => ({
    name,
    image: `https://picsum.photos/seed/category-${i + 1}/400/400`,
    seller: users[i % users.length]._id,
    createdAt: now,
    updatedAt: now,
    __v: 0,
  }));
  await db.collection("categories").insertMany(categories);

  const products = [];
  let n = 0;
  for (const [category, items] of Object.entries(CATALOG)) {
    for (const [name, price] of items) {
      const status = STATUSES[rand(0, STATUSES.length - 1)];
      const seed = encodeURIComponent(`${category}-${name}`);
      products.push({
        name,
        price,
        // ~30% of products are on sale: originalPrice is 10-40% above price
        ...(Math.random() < 0.3 ? { originalPrice: Math.round((price * (1 + rand(10, 40) / 100)) / 1000) * 1000 } : {}),
        category,
        ownerId: users[n % users.length]._id, // round-robin => even split
        status,
        quantity: status === "out_of_stock" ? 0 : rand(5, 200),
        description: `${name} - sản phẩm thuộc danh mục ${category}, chất lượng tốt, giao hàng nhanh.`,
        images: [
          `https://picsum.photos/seed/${seed}-1/600/600`,
          `https://picsum.photos/seed/${seed}-2/600/600`,
        ],
        rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
        reviewCount: rand(0, 500),
        createdAt: now,
        updatedAt: now,
        __v: 0,
      });
      n++;
    }
  }
  await db.collection("products").insertMany(products);

  console.log(`✅ Đã tạo ${categories.length} category, ${products.length} sản phẩm cho ${users.length} user.`);
}

main()
  .catch((err) => {
    console.error("❌", err.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
