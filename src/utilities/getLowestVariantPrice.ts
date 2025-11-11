import type { Product } from '@/payload-types'

export function getLowestVariantPrice(product?: Product | null) {
  if (!product?.variants?.length) return undefined

  const prices = product.variants
    .map((variant) => variant?.price)
    .filter((price): price is number => typeof price === 'number')

  if (!prices.length) return undefined

  return Math.min(...prices)
}
