import React from 'react'
import Image from 'next/image'
import { TextFade } from '@/components/animations'
import { HoverPrefetchLink } from '@/components/HoverPrefetchLink'

export interface ContentWithImageProps {
  title: string
  description: string
  imageUrl: string
  link: string
  layout?: 'left' | 'right'
  label?: string
}

const ContentWithImage = ({
  title,
  description,
  imageUrl,
  link,
  layout = 'right',
  label = 'Dự án',
}: ContentWithImageProps) => {
  const isImageRight = layout === 'right'

  return (
    <div
      className={`flex flex-col-reverse ${isImageRight ? 'lg:flex-row' : 'lg:flex-row-reverse'} lg:min-h-[calc(100vh-var(--header-height))]`}
    >
      {/* Text Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-8 lg:px-16 bg-white py-12 lg:py-0">
        <div className="lg:max-w-[420px] mx-auto w-full">
          <TextFade direction="up" deep={100}>
            <p className="text-2xl font-semibold font-quicksand  text-gray-400 mb-2">{label}</p>
            <h2 className="mb-4 lg:mb-6">{title}</h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 lg:mb-8">
              {description}
            </p>
            <HoverPrefetchLink
              href={link}
              className="text-gray-800 underline text-lg hover:text-gray-600 transition-colors"
            >
              XEM THÊM
            </HoverPrefetchLink>
          </TextFade>
        </div>
      </div>

      {/* Image */}
      <div className="w-full lg:w-1/2 relative overflow-hidden h-64 sm:h-80 lg:h-auto">
        <Image src={imageUrl} alt={title} fill className="object-cover image-zoom-out" priority />
      </div>
    </div>
  )
}

export default ContentWithImage
