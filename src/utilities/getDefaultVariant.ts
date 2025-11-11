import type { Product } from '@/payload-types'

/**
 * Returns the preferred variant for a product, falling back to the first entry.
 */
export function getDefaultVariant(product?: Product | null) {
  if (!product?.variants?.length) {
    return undefined
  }

  return product.variants.find((variant) => variant?.isDefault) ?? product.variants[0]
}
