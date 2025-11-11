'use client'

import React, { useMemo, useState } from 'react'
import type { Product, Media } from '@/payload-types'
import {
  AnimatedProductInfo,
  AnimatedContactButton,
} from '@/components/animations/ProductAnimations'
import { ProductGallery, type GalleryImage } from '@/components/ProductCard'
import { getDefaultVariant } from '@/utilities/getDefaultVariant'
import { getLowestVariantPrice } from '@/utilities/getLowestVariantPrice'
import { formatPrice } from '@/utilities/formatPrice'

type ProductVariant = NonNullable<Product['variants']>[number]

const getVariantKey = (variant: ProductVariant, fallbackIndex: number) =>
  variant?.id ?? variant?.code ?? `variant-${fallbackIndex}`

interface ProductDetailClientProps {
  product: Product
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const defaultVariant = getDefaultVariant(product)

  const variantOptions = useMemo(
    () =>
      (product.variants ?? [])
        .filter((variant): variant is ProductVariant => Boolean(variant))
        .map((variant, index) => ({
          key: getVariantKey(variant, index),
          data: variant,
        })),
    [product.variants],
  )

  const defaultVariantKey = useMemo(() => {
    if (!variantOptions.length) return null

    if (!defaultVariant) {
      return variantOptions[0].key
    }

    const matched = variantOptions.find((option) => option.data.id === defaultVariant.id)
    if (matched) {
      return matched.key
    }

    return variantOptions[0].key
  }, [defaultVariant, variantOptions])

  const [selectedVariantKey, setSelectedVariantKey] = useState<string | null>(defaultVariantKey)

  const selectedVariant = useMemo(() => {
    if (!variantOptions.length) return undefined

    return (
      variantOptions.find((option) => option.key === selectedVariantKey)?.data ??
      variantOptions[0].data
    )
  }, [selectedVariantKey, variantOptions])

  const galleryImages = useMemo<GalleryImage[]>(() => {
    const images: GalleryImage[] = []

    if (typeof product.previewImage === 'object' && product.previewImage?.url) {
      images.push({
        url: product.previewImage.url,
        alt: product.previewImage.alt ?? `${product.title} - Ảnh đại diện`,
      })
    }

    if (typeof product.previewBackImage === 'object' && product.previewBackImage?.url) {
      images.push({
        url: product.previewBackImage.url,
        alt: product.previewBackImage.alt ?? `${product.title} - Ảnh kỹ thuật`,
      })
    }

    variantOptions.forEach((option) => {
      option.data.images?.forEach((imageEntry, imageIndex) => {
        const media = imageEntry.image as Media
        if (typeof media === 'object' && media?.url) {
          images.push({
            url: media.url,
            alt: `${option.data.name} - Ảnh ${imageIndex + 1}`,
            variantId: option.key,
          })
        }
      })
    })

    return images
  }, [product.previewBackImage, product.previewImage, product.title, variantOptions])

  const variantImageIndexMap = useMemo(() => {
    const map = new Map<string, number>()
    galleryImages.forEach((image, index) => {
      if (image.variantId && !map.has(image.variantId)) {
        map.set(image.variantId, index)
      }
    })
    return map
  }, [galleryImages])

  const activeImageIndex = useMemo(() => {
    if (!galleryImages.length) return 0
    if (selectedVariantKey) {
      const variantIndex = variantImageIndexMap.get(selectedVariantKey)
      if (variantIndex !== undefined) {
        return variantIndex
      }
    }
    return 0
  }, [galleryImages, selectedVariantKey, variantImageIndexMap])

  const lowestPrice = getLowestVariantPrice(product)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <ProductGallery
        key={`${product.id}-${selectedVariantKey ?? 'default'}`}
        images={galleryImages}
        productTitle={product.title}
        initialImageIndex={activeImageIndex}
      />

      <div className="space-y-6">
        <AnimatedProductInfo
          title={product.title}
          variantName={selectedVariant?.name}
          code={selectedVariant?.code}
          price={lowestPrice}
          unit={product.unit || undefined}
          shortDescription={product.shortDescription || undefined}
        />

        {variantOptions.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-600">Chọn phân loại</p>
            <div className="flex flex-wrap gap-3">
              {variantOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setSelectedVariantKey(option.key)}
                  className={`flex-1 min-w-[150px] border rounded-xl p-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${option.key === selectedVariantKey ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <span className="block text-sm font-semibold text-gray-900">
                    {option.data.name}
                  </span>
                  <span className="block text-xs text-gray-500">{option.data.code}</span>
                  {typeof option.data.price === 'number' && (
                    <span className="block text-sm font-semibold text-primary mt-1">
                      {formatPrice(option.data.price, product.unit ?? undefined)}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatedContactButton />
      </div>
    </div>
  )
}
