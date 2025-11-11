import React from 'react'
import {
  BannerCarouselBlockComponent,
  HeroSliderBlockComponent,
  TypicalProjectsBlockComponent,
  FeaturedProductsBlockComponent,
  PartnersBlockComponent,
  ContentWithImageBlockComponent,
  TestimonialSectionBlockComponent,
  ContactSectionBlockComponent,
} from '@/blocks'
import type {
  BannerCarouselBlock,
  HeroSliderBlock,
  TypicalProjectsBlock,
  FeaturedProductsBlock,
  PartnersBlock,
  ContentWithImageBlock,
  TestimonialSectionBlock,
  ContactSectionBlock,
} from '@/payload-types'

type BlockType =
  | BannerCarouselBlock
  | HeroSliderBlock
  | TypicalProjectsBlock
  | FeaturedProductsBlock
  | PartnersBlock
  | ContentWithImageBlock
  | TestimonialSectionBlock
  | ContactSectionBlock

export const RenderBlocks: React.FC<{
  blocks: BlockType[]
}> = ({ blocks }) => {
  return (
    <>
      {blocks?.map((block, index) => {
        switch (block.blockType) {
          case 'bannerCarousel':
            return <BannerCarouselBlockComponent key={index} {...block} />
          case 'heroSlider':
            return <HeroSliderBlockComponent key={index} {...block} />
          case 'typicalProjects':
            return <TypicalProjectsBlockComponent key={index} {...block} />
          case 'featuredProducts':
            return <FeaturedProductsBlockComponent key={index} {...block} />
          case 'partners':
            return <PartnersBlockComponent key={index} {...block} />
          case 'contentWithImage':
            return <ContentWithImageBlockComponent key={index} {...block} />
          case 'testimonialSection':
            return <TestimonialSectionBlockComponent key={index} {...block} />
          case 'contactSection':
            return <ContactSectionBlockComponent key={index} {...block} />
          default:
            return null
        }
      })}
    </>
  )
}
