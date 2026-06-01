/* Static dummy data ported from data.js (Halo design system) */

const PALETTES = [
  ['#FCD9F0', '#F5A8DA', '#E879C9'],
  ['#DDD6FE', '#A78BFA', '#7C3AED'],
  ['#FED7AA', '#FB923C', '#EA580C'],
  ['#BBF7D0', '#34D399', '#059669'],
  ['#BAE6FD', '#38BDF8', '#0284C7'],
  ['#FEF08A', '#FACC15', '#CA8A04'],
  ['#E5E7EB', '#9CA3AF', '#374151'],
  ['#FBCFE8', '#F472B6', '#BE185D'],
  ['#C7D2FE', '#818CF8', '#4338CA'],
  ['#FDE68A', '#F59E0B', '#92400E'],
]

export function productGradient(seed: number): { background: string } {
  const p = PALETTES[seed % PALETTES.length]
  return { background: `linear-gradient(135deg, ${p[0]} 0%, ${p[1]} 55%, ${p[2]} 100%)` }
}

export function categoryGradient(seed: number): { background: string } {
  const p = PALETTES[seed % PALETTES.length]
  return { background: `linear-gradient(135deg, ${p[0]} 0%, ${p[2]} 100%)` }
}

export const COLOR_OPTIONS = [
  { name: 'Onyx', hex: '#1a1626' },
  { name: 'Bone', hex: '#f5f0e6' },
  { name: 'Sage', hex: '#a8b59c' },
  { name: 'Clay', hex: '#c97b5f' },
  { name: 'Ocean', hex: '#3b6e8f' },
  { name: 'Lilac', hex: '#b9a0d1' },
  { name: 'Amber', hex: '#d39c4b' },
  { name: 'Rose', hex: '#e3a4b5' },
]

export interface HaloProduct {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  badge?: 'sale' | 'new' | 'hot' | 'limited'
  badgeText?: string
  lowStock?: string
  category: string
  seed: number
  colors: number[]
}

export const HALO_PRODUCTS: HaloProduct[] = [
  { id: 'p1',  name: 'Volta Wireless Headphones', brand: 'Aether',      price: 289, originalPrice: 349, rating: 4.8, reviews: 1284, badge: 'sale',    badgeText: '-17%', category: 'audio',     seed: 1, colors: [0,3,5] },
  { id: 'p2',  name: 'Halo Mini Speaker',          brand: 'North&Co',   price: 129,                     rating: 4.6, reviews: 412,  badge: 'new',                        category: 'audio',     seed: 0, colors: [0,1,4] },
  { id: 'p3',  name: 'Field Linen Throw',           brand: 'Field Lab',  price: 89,                      rating: 4.9, reviews: 218,  badge: 'hot',                        category: 'home',      seed: 7, colors: [1,2,6,7] },
  { id: 'p4',  name: 'Pavo Desk Lamp',              brand: 'Pavo',       price: 199, originalPrice: 249, rating: 4.7, reviews: 326,  badge: 'sale',    badgeText: '-20%', category: 'workspace', seed: 5, colors: [0,5,4] },
  { id: 'p5',  name: 'Mono Smart Ring',             brand: 'Mono Studio',price: 349,                     rating: 4.5, reviews: 612,  badge: 'limited', badgeText: 'Limited', category: 'wearables', seed: 4, colors: [0,6] },
  { id: 'p6',  name: 'Verse Yoga Mat',              brand: 'Verse',      price: 79,                      rating: 4.8, reviews: 504,                                       category: 'wellness',  seed: 3, colors: [2,3,7] },
  { id: 'p7',  name: 'Hara Cashmere Crew',          brand: 'Hara',       price: 245,                     rating: 4.6, reviews: 188,  badge: 'new',                        category: 'apparel',   seed: 8, colors: [1,2,6,7,5] },
  { id: 'p8',  name: 'Lumi Diffuser No. 4',         brand: 'Lumi',       price: 65,                      rating: 4.4, reviews: 829,  badge: 'hot',                        category: 'home',      seed: 2, colors: [0,5,7] },
  { id: 'p9',  name: 'Aether Acoustic Buds',        brand: 'Aether',     price: 179, originalPrice: 199, rating: 4.7, reviews: 942,  badge: 'sale',    badgeText: '-10%', category: 'audio',     seed: 6, colors: [0,1] },
  { id: 'p10', name: 'North Travel Mug',            brand: 'North&Co',   price: 42,                      rating: 4.9, reviews: 1432,                                      category: 'workspace', seed: 9, colors: [0,4,3] },
  { id: 'p11', name: 'Mono Vinyl Notebook',         brand: 'Mono Studio',price: 28,                      rating: 4.5, reviews: 92,   badge: 'new',                        category: 'workspace', seed: 2, colors: [0,7,1] },
  { id: 'p12', name: 'Pavo Wall Clock',             brand: 'Pavo',       price: 158, originalPrice: 188, rating: 4.6, reviews: 64,   badge: 'sale',    badgeText: '-16%', category: 'home',      seed: 4, colors: [1,6] },
]

export interface HaloCategory {
  id: string
  name: string
  count: number
  seed: number
}

export const HALO_CATEGORIES: HaloCategory[] = [
  { id: 'audio',     name: 'Audio',     count: 248, seed: 1 },
  { id: 'wearables', name: 'Wearables', count: 156, seed: 4 },
  { id: 'home',      name: 'Home',      count: 412, seed: 0 },
  { id: 'workspace', name: 'Workspace', count: 184, seed: 8 },
  { id: 'wellness',  name: 'Wellness',  count: 92,  seed: 3 },
  { id: 'apparel',   name: 'Apparel',   count: 528, seed: 7 },
]

export const HALO_TESTIMONIALS = [
  { name: 'Minh Anh', role: 'Kiến trúc sư, Hà Nội', quote: 'Mỗi sản phẩm tôi mua đều đúng như mô tả, chất lượng thật sự xứng đáng với giá tiền. Giao hàng nhanh, đóng gói cẩn thận.', avatar: 0 },
  { name: 'Tuấn Kiệt', role: 'Producer, TP.HCM', quote: 'Tai nghe Volta thay thế được cả hai cái cũ của tôi. Đây là $289 đáng giá nhất năm nay cho thiết bị âm thanh.', avatar: 2 },
  { name: 'Thu Hà', role: 'Giáo viên yoga, Đà Nẵng', quote: 'Chọn lọc tuyệt vời, vận chuyển nhanh đến bất ngờ. Khu Wellness là một cửa hàng hoàn chỉnh trong chính nó.', avatar: 7 },
]

export const MEGA_MENU: Record<string, { blocks: { title: string; items: string[] }[]; featured: { tag: string; title: string; sub: string; seed: number } }> = {
  'New In': {
    blocks: [
      { title: 'Just Landed', items: ['This week', 'Last 30 days', 'Pre-order', 'Coming soon'] },
      { title: "Editor's Picks", items: ['Halo Loves', 'Staff Edit', 'Limited drops', 'Collaborations'] },
      { title: 'Trending', items: ['Most wished', 'Best reviewed', 'Restock alert', 'Last chance'] },
    ],
    featured: { tag: 'NEW IN AUDIO', title: 'Volta Series II', sub: 'Studio-grade headphones', seed: 1 },
  },
  Shop: {
    blocks: [
      { title: 'Audio', items: ['Headphones', 'Earbuds', 'Speakers', 'Turntables'] },
      { title: 'Home', items: ['Lighting', 'Textiles', 'Ceramics', 'Diffusers'] },
      { title: 'Workspace', items: ['Lamps', 'Stationery', 'Drinkware', 'Desk gear'] },
      { title: 'Wearables', items: ['Watches', 'Rings', 'Trackers', 'Accessories'] },
    ],
    featured: { tag: 'FALL EDIT', title: 'Quiet Earth', sub: '12 pieces, one mood', seed: 7 },
  },
  Brands: {
    blocks: [
      { title: 'A–F', items: ['Aether', 'Field Lab', 'Frame', 'Forma'] },
      { title: 'G–M', items: ['Hara', 'Lumi', 'Mono Studio'] },
      { title: 'N–S', items: ['North & Co', 'Pavo', 'Rove'] },
      { title: 'T–Z', items: ['Tilde', 'Verse', 'Wove'] },
    ],
    featured: { tag: 'BRAND SPOTLIGHT', title: 'Mono Studio', sub: 'Tokyo, est. 2017', seed: 4 },
  },
  Stories: {
    blocks: [
      { title: 'Read', items: ['Journal', 'Interviews', 'Behind the design', 'Field notes'] },
      { title: 'Watch', items: ['Studio visits', 'Process films', 'Unboxings'] },
      { title: 'Listen', items: ['Halo Radio', 'Founder talks'] },
    ],
    featured: { tag: 'FILM', title: 'A morning with Hara', sub: 'Kyoto, autumn 2026', seed: 8 },
  },
  Sale: {
    blocks: [
      { title: 'Up to 50% off', items: ['Audio', 'Home', 'Workspace'] },
      { title: 'Final markdown', items: ['Under $50', 'Under $100'] },
      { title: 'Outlet', items: ['Last chance', 'Open box'] },
    ],
    featured: { tag: 'FLASH 24H', title: '−40% on Volta', sub: 'Ends midnight tonight', seed: 5 },
  },
}
