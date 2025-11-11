'use client'

import React from 'react'
import Image from 'next/image'
import { HoverPrefetchLink } from '@/components/HoverPrefetchLink'
import { motion } from 'motion/react'
import type { Category } from '@/payload-types'

interface CategoryCardProps {
  category: Category
  index?: number
}

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  const bannerUrl =
    typeof category.bannerImage === 'object' && category.bannerImage?.url
      ? category.bannerImage.url
      : '/placeholder-category.jpg'

  return (
    <motion.div
      className="group relative overflow-hidden border border-gray-200 bg-white transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
    >
      <HoverPrefetchLink href={`/danh-muc/${category.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={bannerUrl}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="p-4">
          <h3 className="group-hover:text-primary transition-colors text-lg">{category.name}</h3>
          {category.shortDescription && (
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">{category.shortDescription}</p>
          )}
        </div>
      </HoverPrefetchLink>
    </motion.div>
  )
}
