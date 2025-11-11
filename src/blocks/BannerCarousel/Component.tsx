import React from 'react'
import HomeBanner from '@/components/HomeBanner/HomeBanner'
import type { BannerCarouselBlock as BannerCarouselBlockType } from '@/payload-types'

export const BannerCarouselBlockComponent: React.FC<BannerCarouselBlockType> = ({ slides }) => {
  if (!slides?.length) return null

  const bannerSlides = slides.map((slide) => ({
    title: slide.title,
    subtitle: slide.subtitle || '',
    description: slide.description || '',
    imageUrl: typeof slide.image === 'object' ? slide.image.url || '' : '',
    link: slide.link?.url || '',
  }))

  return <HomeBanner slides={bannerSlides} />
}
