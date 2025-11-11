import React from 'react'
import Slider from '@/components/Slider'
import SliderItem from '@/components/SliderItem'
import ContentWithImage from '@/components/ContentWithImage'
import type { ContentWithImageBlock as ContentWithImageBlockType } from '@/payload-types'

export const ContentWithImageBlockComponent: React.FC<ContentWithImageBlockType> = ({
  label,
  items,
}) => {
  if (!items?.length) return null

  return (
    <Slider animation="fade">
      {items.map((item, index: number) => (
        <SliderItem key={index}>
          <ContentWithImage
            label={label || 'Dự án'}
            title={item.title}
            description={item.description}
            imageUrl={typeof item.picture === 'object' ? item.picture?.url || '' : ''}
            link={item.link?.url || ''}
            layout="left"
          />
        </SliderItem>
      ))}
    </Slider>
  )
}
