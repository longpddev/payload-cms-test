'use client'

import { FC } from 'react'
import { HoverPrefetchLink } from '@/components/HoverPrefetchLink'
import { TextFade } from '../animations'
import { GlassButton } from '@/components/ui/glass-button'
import Slider from '../Slider'
import SliderItem from '../SliderItem'
import ImageBackgroundAttachment from '../ImageBackgroundAttachment'
interface BannerItemProps {
  title: string
  subtitle?: string
  description?: string
  imageUrl: string
  link: string
}

const BannerItem: FC<BannerItemProps> = ({ title, subtitle, description, imageUrl, link }) => (
  <SliderItem>
    <div
      className="relative h-[calc(100vh-var(--header-height))]"
      // style={{
      //   backgroundImage: `url(${imageUrl})`,
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      //   backgroundAttachment: 'fixed',
      // }}
    >
      <ImageBackgroundAttachment
        src={imageUrl}
        alt={title}
        fill
        property="background"
        className="absolute inset-0 object-cover w-full h-full block object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
    </div>

    <div className="absolute inset-0 flex items-center">
      <div className="w-full app-container">
        <TextFade direction="up" deep={100}>
          <h1 className="text-white mb-3 md:mb-4 tracking-wider">{title}</h1>
          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl font-extralight text-white/85 mb-3 md:mb-4 tracking-wide">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-sm md:text-base font-light font-geist text-white/70 mb-8 md:mb-12 max-w-xl leading-relaxed tracking-wide">
              {description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
            <GlassButton variant="primary" asChild>
              <HoverPrefetchLink href={link}>Xem sản phẩm</HoverPrefetchLink>
            </GlassButton>
            <GlassButton variant="outline" asChild>
              <HoverPrefetchLink href="/lien-he">Liên hệ tư vấn</HoverPrefetchLink>
            </GlassButton>
          </div>
        </TextFade>
      </div>
    </div>
  </SliderItem>
)

interface BannerProps {
  slides: BannerItemProps[]
}

const HomeBanner: FC<BannerProps> = ({ slides }) => {
  return (
    <Slider animation="fade" autoplay={true} autoplayDelay={10000} loop={true} duration={50}>
      {slides.map((slide, index) => (
        <BannerItem
          key={index}
          title={slide.title}
          subtitle={slide.subtitle}
          description={slide.description}
          imageUrl={slide.imageUrl}
          link={slide.link}
        />
      ))}
    </Slider>
  )
}

export default HomeBanner
