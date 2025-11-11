'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { HoverPrefetchLink } from '@/components/HoverPrefetchLink'
import type { Product } from '@/payload-types'
import { getLowestVariantPrice } from '@/utilities/getLowestVariantPrice'
import { formatPrice } from '@/utilities/formatPrice'

export interface ProductCardProps {
  product: Product
  index?: number
}

const defaultImage = {
  url: '/placeholder-product.jpg',
  alt: 'Placeholder Product',
  width: 275,
  height: 275,
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const productName = product.title
  const productId = product.slug

  // Handle images from Payload Product
  const frontImage = typeof product.previewImage === 'object' ? product.previewImage : defaultImage

  const backImage =
    typeof product.previewBackImage === 'object' ? product.previewBackImage : defaultImage

  // Handle specifications/description
  const specifications = product.shortDescription ? [product.shortDescription] : []

  const displayedPrice = getLowestVariantPrice(product)

  return (
    <HoverPrefetchLink href={`/product/${productId}`}>
      <motion.div
        className="group relative bg-white overflow-hidden cursor-pointer shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 * index }}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {backImage ? (
            <>
              {/* Front Image */}
              <Image
                src={frontImage.url ?? ''}
                alt={frontImage.alt ?? productName}
                fill
                className="object-cover transition-all duration-1000 group-hover:scale-105 group-hover:opacity-0"
              />

              {/* Back Image - Shows on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                <Image
                  src={backImage.url ?? ''}
                  alt={backImage.alt ?? productName}
                  width={backImage.width ?? 275}
                  height={backImage.height ?? 275}
                  className="w-full h-full object-cover"
                />
              </div>
            </>
          ) : (
            <Image
              src={frontImage.url ?? ''}
              alt={frontImage.alt ?? productName}
              fill
              className="object-cover transition-all duration-1000 group-hover:scale-105"
            />
          )}

          {/* Product Information Overlay - Always Visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
            <div className="absolute text-center bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-base font-medium mb-2 leading-tight drop-shadow-lg text-white">
                {productName}
              </h3>
              {displayedPrice !== undefined && (
                <p className="text-[12px] font-semibold mb-2 drop-shadow-lg">
                  Giá từ {formatPrice(displayedPrice, product.unit ?? undefined)}
                </p>
              )}
              <div className="space-y-1">
                {specifications.map((spec: string, specIndex: number) => (
                  <p
                    key={specIndex}
                    className="text-[10px] opacity-90 whitespace-pre-wrap leading-tight drop-shadow-md"
                  >
                    {spec}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </HoverPrefetchLink>
  )
}
