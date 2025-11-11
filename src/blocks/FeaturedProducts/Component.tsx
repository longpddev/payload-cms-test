import React from 'react'
import Slider from '@/components/Slider'
import SliderItem from '@/components/SliderItem'
import { ProductCard } from '@/components/ProductCard/ProductCard'
import { TextFade } from '@/components/animations'
import type { FeaturedProductsBlock as FeaturedProductsBlockType } from '@/payload-types'

export const FeaturedProductsBlockComponent: React.FC<FeaturedProductsBlockType> = ({
  sectionTitle,
  selectedProducts,
}) => {
  if (!selectedProducts?.length) return null

  return (
    <section className="py-16 bg-gray-100">
      <TextFade direction="up" deep={100}>
        <div className="text-center mb-12">
          <h2 className="text-center mb-12">{sectionTitle || 'Sản phẩm nổi bật'}</h2>
        </div>

        <Slider autoplay={false} align="center" className="app-container">
          {selectedProducts.map((product, index) => {
            // Handle relationship data - product could be string (ID) or full object
            if (typeof product === 'string') return null
            if (typeof product === 'number') return null

            return (
              <SliderItem key={product.id || index} className="w-3/4 md:w-1/2 lg:w-1/3">
                <div className="px-2">
                  <ProductCard product={product} index={index} />
                </div>
              </SliderItem>
            )
          })}
        </Slider>
      </TextFade>
    </section>
  )
}
