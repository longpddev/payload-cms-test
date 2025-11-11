import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Slider from '@/components/Slider'
import SliderItem from '@/components/SliderItem'
import type { HeroSliderBlock as HeroSliderBlockType } from '@/payload-types'

export const HeroSliderBlockComponent: React.FC<HeroSliderBlockType> = ({ slides }) => {
  if (!slides?.length) return null

  return (
    <section className="relative">
      <Slider innerIndicators>
        {slides.map((slide, index) => {
          const media =
            slide.backgroundImage && typeof slide.backgroundImage === 'object'
              ? slide.backgroundImage
              : null
          const imageUrl = media?.url || ''
          const ctaUrl = slide.cta?.url || '#'
          const shouldOpenNewTab = slide.cta?.openInNewTab ?? false

          return (
            <SliderItem key={slide.id || index}>
              <div className="relative flex h-[500px] w-full flex-col justify-between pt-[100px] pb-[50px] text-center">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={slide.title || `Hero slide ${index + 1}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    fill
                    priority={index === 0}
                  />
                ) : (
                  <div className="absolute inset-0 bg-muted" aria-hidden="true" />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />
                <div className="relative z-10 flex flex-1 flex-col items-center justify-between gap-6 text-white">
                  {slide.title && <h2>{slide.title}</h2>}
                  {slide.cta?.url && (
                    <Link
                      href={ctaUrl}
                      target={shouldOpenNewTab ? '_blank' : undefined}
                      rel={shouldOpenNewTab ? 'noopener noreferrer' : undefined}
                      className="hover:underline inline-block mx-auto"
                    >
                      {slide.cta?.label || 'Xem thêm'}
                    </Link>
                  )}
                </div>
              </div>
            </SliderItem>
          )
        })}
      </Slider>
    </section>
  )
}
