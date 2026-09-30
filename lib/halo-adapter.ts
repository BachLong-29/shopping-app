import { Product } from '@/core/model/Product'
import { HaloProduct } from '@/lib/halo-data'

const hashSeed = (s: string) => [...s].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7) % 10

/** Map a DB product to the shape the Halo home sections render. */
export function toHaloProduct(p: Product): HaloProduct {
  const onSale = p.originalPrice != null && p.originalPrice > p.price
  const discount = onSale ? Math.round((1 - p.price / (p.originalPrice as number)) * 100) : 0
  const reviews = p.reviewCount ?? 0

  return {
    id: p._id,
    name: p.name,
    brand: p.category ?? '',
    price: p.price,
    originalPrice: onSale ? p.originalPrice : undefined,
    rating: p.rating ?? 0,
    reviews,
    badge: onSale ? 'sale' : reviews >= 400 ? 'hot' : undefined,
    badgeText: onSale ? `-${discount}%` : undefined,
    category: p.category ?? '',
    seed: hashSeed(p._id),
    colors: [],
    image: p.images?.[0],
  }
}
