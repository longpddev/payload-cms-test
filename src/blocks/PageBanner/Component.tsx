'use client'

import React from 'react'
import { PageBanner } from '@/components/PageBanner/PageBanner'
import type { PageBannerBlock } from '@/payload-types'

export const PageBannerBlockComponent: React.FC<PageBannerBlock> = ({
  title,
  subtitle,
  variant,
  backgroundImage,
  height,
}) => {
  const backgroundImageUrl =
    typeof backgroundImage === 'object' && backgroundImage?.url
      ? backgroundImage.url
      : typeof backgroundImage === 'string'
        ? backgroundImage
        : undefined

  return (
    <PageBanner
      title={title}
      subtitle={subtitle ?? undefined}
      variant={variant ?? undefined}
      backgroundImage={backgroundImageUrl}
      height={height ?? undefined}
    />
  )
}
