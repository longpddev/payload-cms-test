'use client'

import React from 'react'
import Image from 'next/image'
import { HoverPrefetchLink } from '@/components/HoverPrefetchLink'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'motion/react'
import { formatPrice } from '@/utilities/formatPrice'

interface AnimatedBackButtonProps {
  href: string
}

export function AnimatedBackButton({ href }: AnimatedBackButtonProps) {
  return (
    <HoverPrefetchLink href={href}>
      <motion.button
        className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-8"
        whileHover={{ x: -5 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowLeft className="w-5 h-5" />
        Quay lại
      </motion.button>
    </HoverPrefetchLink>
  )
}

interface AnimatedProductImagesProps {
  images: string[]
  productTitle: string
}

export function AnimatedProductImages({ images, productTitle }: AnimatedProductImagesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      {images.map((imageUrl, index) => (
        <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
          <Image
            src={imageUrl}
            alt={`${productTitle} - Ảnh ${index + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </motion.div>
  )
}

interface AnimatedProductInfoProps {
  title: string
  code?: string
  price?: number
  unit?: string
  shortDescription?: string
  variantName?: string
}

export function AnimatedProductInfo({
  title,
  code,
  price,
  unit,
  shortDescription,
  variantName,
}: AnimatedProductInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      <div>
        <h1 className="mb-2">{title}</h1>
        {variantName && (
          <p className="text-base font-medium text-gray-500 mb-1">Phiên bản: {variantName}</p>
        )}
        {code && <p className="text-lg font-medium text-gray-700 mb-2">Mã sản phẩm: {code}</p>}
        {price !== undefined && price !== null && (
          <p className="text-2xl font-bold text-primary mb-2">
            Giá từ {formatPrice(price, unit)}
          </p>
        )}
      </div>

      {shortDescription && (
        <p id="shortDescription" className="text-gray-600 leading-relaxed whitespace-pre-wrap">
          {shortDescription}
        </p>
      )}
    </motion.div>
  )
}

export function AnimatedContactButton() {
  return (
    <HoverPrefetchLink href="/lien-he">
      <motion.button
        className="w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Liên hệ
      </motion.button>
    </HoverPrefetchLink>
  )
}
