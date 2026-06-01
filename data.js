2; /* ============================================================
   HALO — Product & content data
   ============================================================ */

// Product imagery — abstract gradient placeholders w/ "product shot" label
// (No drawn SVG art — see system prompt rules)
const PALETTES = [
  ["#FCD9F0", "#F5A8DA", "#E879C9"], // pink
  ["#DDD6FE", "#A78BFA", "#7C3AED"], // violet
  ["#FED7AA", "#FB923C", "#EA580C"], // orange
  ["#BBF7D0", "#34D399", "#059669"], // emerald
  ["#BAE6FD", "#38BDF8", "#0284C7"], // sky
  ["#FEF08A", "#FACC15", "#CA8A04"], // amber
  ["#E5E7EB", "#9CA3AF", "#374151"], // graphite
  ["#FBCFE8", "#F472B6", "#BE185D"], // rose
  ["#C7D2FE", "#818CF8", "#4338CA"], // indigo
  ["#FDE68A", "#F59E0B", "#92400E"], // honey
];

function productImage(seed, label, sub) {
  const p = PALETTES[seed % PALETTES.length];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'>
    <defs>
      <linearGradient id='g${seed}' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='${p[0]}'/>
        <stop offset='55%' stop-color='${p[1]}'/>
        <stop offset='100%' stop-color='${p[2]}'/>
      </linearGradient>
      <radialGradient id='r${seed}' cx='30%' cy='25%' r='60%'>
        <stop offset='0%' stop-color='white' stop-opacity='0.55'/>
        <stop offset='100%' stop-color='white' stop-opacity='0'/>
      </radialGradient>
    </defs>
    <rect width='400' height='500' fill='url(#g${seed})'/>
    <rect width='400' height='500' fill='url(#r${seed})'/>
    <circle cx='200' cy='250' r='110' fill='white' fill-opacity='0.12'/>
    <circle cx='200' cy='250' r='70' fill='white' fill-opacity='0.18'/>
    <text x='200' y='245' font-family='ui-monospace, Menlo, monospace' font-size='11' letter-spacing='2' text-anchor='middle' fill='white' fill-opacity='0.85'>${(sub || "product").toUpperCase()}</text>
    <text x='200' y='275' font-family='Plus Jakarta Sans, system-ui, sans-serif' font-weight='600' font-size='22' text-anchor='middle' fill='white'>${label}</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function catImage(seed, label) {
  const p = PALETTES[seed % PALETTES.length];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'>
    <defs>
      <linearGradient id='cg${seed}' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='${p[0]}'/>
        <stop offset='100%' stop-color='${p[2]}'/>
      </linearGradient>
    </defs>
    <rect width='400' height='500' fill='url(#cg${seed})'/>
    <g opacity='0.18' fill='white'>
      <circle cx='80' cy='100' r='30'/>
      <circle cx='320' cy='80' r='50'/>
      <circle cx='340' cy='400' r='80'/>
      <rect x='40' y='300' width='120' height='120' rx='20' transform='rotate(-12 100 360)'/>
    </g>
    <text x='32' y='80' font-family='Plus Jakarta Sans' font-weight='600' font-size='14' fill='white' fill-opacity='0.7' letter-spacing='2'>CATEGORY</text>
    <text x='32' y='120' font-family='Instrument Serif, serif' font-size='44' fill='white'>${label}</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

const CATEGORIES = [
  { id: "audio", name: "Audio", count: 248, seed: 1 },
  { id: "wearables", name: "Wearables", count: 156, seed: 4 },
  { id: "home", name: "Home", count: 412, seed: 0 },
  { id: "workspace", name: "Workspace", count: 184, seed: 8 },
  { id: "wellness", name: "Wellness", count: 92, seed: 3 },
  { id: "apparel", name: "Apparel", count: 528, seed: 7 },
];

const BRANDS = [
  "North&Co",
  "Aether",
  "Mono Studio",
  "Hara",
  "Field Lab",
  "Lumi",
  "Verse",
  "Pavo",
];

const COLOR_OPTIONS = [
  { name: "Onyx", hex: "#1a1626" },
  { name: "Bone", hex: "#f5f0e6" },
  { name: "Sage", hex: "#a8b59c" },
  { name: "Clay", hex: "#c97b5f" },
  { name: "Ocean", hex: "#3b6e8f" },
  { name: "Lilac", hex: "#b9a0d1" },
  { name: "Amber", hex: "#d39c4b" },
  { name: "Rose", hex: "#e3a4b5" },
];

const SIZES = ["XS", "S", "M", "L", "XL"];

const PRODUCTS = [
  {
    id: "p1",
    name: "Volta Wireless Headphones",
    brand: "Aether",
    price: 289,
    orig: 349,
    rating: 4.8,
    reviews: 1284,
    badge: "sale",
    badgeText: "-17%",
    stock: "low",
    stockText: "Only 4 left",
    colors: [0, 3, 5],
    cat: "audio",
    seed: 1,
    label: "Volta",
    sub: "over-ear",
  },
  {
    id: "p2",
    name: "Halo Mini Speaker",
    brand: "North&Co",
    price: 129,
    rating: 4.6,
    reviews: 412,
    badge: "new",
    colors: [0, 1, 4],
    cat: "audio",
    seed: 0,
    label: "Halo Mini",
    sub: "speaker",
  },
  {
    id: "p3",
    name: "Field Linen Throw",
    brand: "Field Lab",
    price: 89,
    rating: 4.9,
    reviews: 218,
    badge: "hot",
    colors: [1, 2, 6, 7],
    cat: "home",
    seed: 7,
    label: "Linen Throw",
    sub: "home textile",
  },
  {
    id: "p4",
    name: "Pavo Desk Lamp",
    brand: "Pavo",
    price: 199,
    orig: 249,
    rating: 4.7,
    reviews: 326,
    badge: "sale",
    badgeText: "-20%",
    colors: [0, 5, 4],
    cat: "workspace",
    seed: 5,
    label: "Pavo Lamp",
    sub: "task lighting",
  },
  {
    id: "p5",
    name: "Mono Smart Ring",
    brand: "Mono Studio",
    price: 349,
    rating: 4.5,
    reviews: 612,
    badge: "limited",
    badgeText: "Limited",
    colors: [0, 6],
    cat: "wearables",
    seed: 4,
    label: "Mono Ring",
    sub: "wearable",
  },
  {
    id: "p6",
    name: "Verse Yoga Mat",
    brand: "Verse",
    price: 79,
    rating: 4.8,
    reviews: 504,
    colors: [2, 3, 7],
    cat: "wellness",
    seed: 3,
    label: "Verse Mat",
    sub: "wellness",
  },
  {
    id: "p7",
    name: "Hara Cashmere Crew",
    brand: "Hara",
    price: 245,
    rating: 4.6,
    reviews: 188,
    badge: "new",
    colors: [1, 2, 6, 7, 5],
    cat: "apparel",
    seed: 8,
    label: "Cashmere",
    sub: "knitwear",
  },
  {
    id: "p8",
    name: "Lumi Diffuser No. 4",
    brand: "Lumi",
    price: 65,
    rating: 4.4,
    reviews: 829,
    badge: "hot",
    colors: [0, 5, 7],
    cat: "home",
    seed: 2,
    label: "Diffuser",
    sub: "aroma",
  },
  {
    id: "p9",
    name: "Aether Acoustic Buds",
    brand: "Aether",
    price: 179,
    orig: 199,
    rating: 4.7,
    reviews: 942,
    badge: "sale",
    badgeText: "-10%",
    colors: [0, 1],
    cat: "audio",
    seed: 6,
    label: "Buds Pro",
    sub: "in-ear",
  },
  {
    id: "p10",
    name: "North Travel Mug",
    brand: "North&Co",
    price: 42,
    rating: 4.9,
    reviews: 1432,
    colors: [0, 4, 3],
    cat: "workspace",
    seed: 9,
    label: "Travel Mug",
    sub: "drinkware",
  },
  {
    id: "p11",
    name: "Mono Vinyl Notebook",
    brand: "Mono Studio",
    price: 28,
    rating: 4.5,
    reviews: 92,
    badge: "new",
    colors: [0, 7, 1],
    cat: "workspace",
    seed: 2,
    label: "Notebook",
    sub: "stationery",
  },
  {
    id: "p12",
    name: "Pavo Wall Clock",
    brand: "Pavo",
    price: 158,
    orig: 188,
    rating: 4.6,
    reviews: 64,
    badge: "sale",
    badgeText: "-16%",
    colors: [1, 6],
    cat: "home",
    seed: 4,
    label: "Wall Clock",
    sub: "home decor",
  },
];

// Attach images
PRODUCTS.forEach((p) => {
  p.image = productImage(p.seed, p.label, p.sub);
  p.colorOpts = p.colors.map((i) => COLOR_OPTIONS[i]);
});
CATEGORIES.forEach((c) => {
  c.image = catImage(c.seed, c.name);
});

const TESTIMONIALS = [
  {
    name: "Asha Patel",
    role: "Architect, Mumbai",
    quote:
      "Halo turned my apartment into the showroom I always pictured. Every piece arrives photo-ready.",
    avatar: 0,
  },
  {
    name: "Marcus Chen",
    role: "Producer, Berlin",
    quote:
      "The Volta headphones replaced two studio pairs. Best $289 I have spent on gear this year.",
    avatar: 2,
  },
  {
    name: "Yara Okafor",
    role: "Yoga teacher, Lisbon",
    quote:
      "Beautiful curation, ridiculously fast shipping. The wellness section is a complete shop on its own.",
    avatar: 7,
  },
];

const FEATURES = [
  { title: "Free shipping", sub: "On orders over $80", icon: "truck" },
  { title: "60-day returns", sub: "No questions asked", icon: "rotate" },
  { title: "Carbon neutral", sub: "On every delivery", icon: "leaf" },
  { title: "Real humans", sub: "24/7 support, no bots", icon: "chat" },
];

window.HALO = {
  PRODUCTS,
  CATEGORIES,
  BRANDS,
  COLOR_OPTIONS,
  SIZES,
  TESTIMONIALS,
  FEATURES,
  productImage,
  catImage,
};
