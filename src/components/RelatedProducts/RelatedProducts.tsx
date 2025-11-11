import React from 'react'
import config from '@payload-config'
import type { Product } from '@/payload-types'
import { getPayload } from 'payload'
import { ProductCard } from '@/components/ProductCard'
import Slider from '@/components/Slider'
import SliderItem from '@/components/SliderItem'

interface RelatedProductsProps {
  currentProductId: number
  categoryId: number
  maxItems?: number
}

async function getRelatedProducts(
  categoryId: number,
  currentProductId: number,
  limit: number = 8,
): Promise<Product[]> {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'products',
      depth: 2,
      where: {
        and: [{ category: { equals: categoryId } }, { id: { not_equals: currentProductId } }],
      },
      limit,
      sort: 'title',
    })

    return result.docs
  } catch (error) {
    console.error('Error fetching related products:', error)
    return []
  }
}

export async function RelatedProducts({
  currentProductId,
  categoryId,
  maxItems = 8,
}: RelatedProductsProps) {
  const relatedProducts = await getRelatedProducts(categoryId, currentProductId, maxItems)

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="py-16">
      <div className="app-container">
        <h2 className="text-center mb-4">Sản Phẩm Tương Tự</h2>
        <div className="relative">
          <Slider showArrows={true} className="h-auto">
            {relatedProducts.map((product) => (
              <SliderItem className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 gap-6 px-4" key={product.id}>
                <ProductCard product={product} />
              </SliderItem>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}
