'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Eye, Heart, ShoppingBag } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/design-system'
import { Product, ProductStatus } from '@/core/model/Product'
import { addToCart } from '@/redux/reducer/cartReducer'
import { RootState } from '@/redux/store/store'
import cartService from '@/app/cart/services/cartServices'
import { useLanguage } from '@/core/context/LanguageContext'

function statusBadge(status: ProductStatus, t: (key: string) => string) {
  switch (status) {
    case ProductStatus.Available:
      return null
    case ProductStatus.OutOfStock:
      return <Badge variant="soldout">{t('product.status.out_of_stock')}</Badge>
    case ProductStatus.Draft:
      return <Badge variant="soft">{t('product.status.draft')}</Badge>
    case ProductStatus.Inactive:
      return <Badge variant="soft">{t('product.status.inactive')}</Badge>
  }
}

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter()
  const userId = useSelector((state: RootState) => state.profile._id)
  const dispatch = useDispatch()
  const { t } = useLanguage()
  const [wished, setWished] = useState(false)

  const imgSrc = product.images?.[0] ?? '/images/product.jpg'
  const isOutOfStock = product.status === ProductStatus.OutOfStock

  async function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation()
    if (isOutOfStock) return
    if (userId) {
      toast.success(t('product.message.updare_cart'), {
        description: <span className="text-black">{t('product.message.add_to_cart')}</span>,
        duration: 3000,
      })
      await cartService.addToCart({ productId: product._id, userId, quantity: 1 })
      dispatch(addToCart(product._id))
    } else {
      router.push('/login')
    }
  }

  function handleWishlist(e: React.MouseEvent) {
    e.stopPropagation()
    setWished((v) => !v)
    toast.success(t('product.message.update_wishlist'), {
      description: (
        <span className="text-black">
          {wished ? t('product.message.remove_from_wishlist') : t('product.message.add_to_wishlist')}
        </span>
      ),
      duration: 3000,
    })
  }

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[20px]',
        'border border-border bg-card',
        'transition-all duration-[400ms] ease-out',
        'hover:-translate-y-1 hover:border-border/80 hover:shadow-lg',
        /* magnetic shimmer via CSS var — applied on mount */
        'before:pointer-events-none before:absolute before:inset-0 before:rounded-[20px] before:z-[1]',
        'before:bg-[radial-gradient(600px_circle_at_var(--mx,50%)_var(--my,50%),rgba(124,58,237,0.06),transparent_40%)]',
        'before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300',
      )}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
    >
      {/* ── Media ── */}
      <div
        className="relative aspect-[4/5] overflow-hidden bg-muted cursor-pointer"
        onClick={() => router.push(`/prod/${product._id}`)}
      >
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
        />

        {/* Badges top-left */}
        <div className="absolute left-3 top-3 z-[2] flex flex-col gap-1.5">
          {statusBadge(product.status, t)}
        </div>

        {/* Actions top-right — visible on hover */}
        <div className="absolute right-3 top-3 z-[2] flex flex-col gap-1.5 translate-x-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
          <button
            type="button"
            aria-label={t('product.card.wishlist')}
            onClick={handleWishlist}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-full',
              'border border-white/60 bg-white/70 backdrop-blur-md',
              'text-foreground transition-all duration-200 hover:scale-105 hover:bg-foreground hover:text-background',
              wished && 'text-halo-rose',
            )}
          >
            <Heart size={15} fill={wished ? 'currentColor' : 'none'} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label={t('product.card.quick_view')}
            onClick={(e) => { e.stopPropagation(); router.push(`/prod/${product._id}`) }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/70 backdrop-blur-md text-foreground transition-all duration-200 hover:scale-105 hover:bg-foreground hover:text-background"
          >
            <Eye size={15} strokeWidth={1.75} />
          </button>
        </div>

        {/* Quick-add bar — slides up on hover */}
        <div className="absolute bottom-3 left-3 right-3 z-[2] translate-y-[120%] transition-transform duration-[400ms] ease-out group-hover:translate-y-0">
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className={cn(
              'flex w-full items-center justify-center gap-1.5',
              'h-9 rounded-full text-xs font-semibold',
              'transition-opacity',
              isOutOfStock
                ? 'cursor-not-allowed bg-muted text-muted-foreground'
                : 'bg-foreground text-background hover:opacity-90',
            )}
          >
            <ShoppingBag size={13} />
            {isOutOfStock
              ? t('product.card.out_of_stock')
              : t('product.card.add_to_bag', { price: `${product.price.toLocaleString('vi-VN')}₫` })}
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="relative z-[2] flex flex-col gap-1.5 p-4">
        {product.category && (
          <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
            {product.category}
          </div>
        )}
        <div
          className="cursor-pointer text-[15px] font-semibold leading-[1.3] tracking-[-0.01em] hover:underline line-clamp-2"
          onClick={() => router.push(`/prod/${product._id}`)}
        >
          {product.name}
        </div>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-[17px] font-bold tracking-[-0.02em]">
            {product.price.toLocaleString('vi-VN')}₫
          </span>
        </div>
      </div>
    </article>
  )
}
