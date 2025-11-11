import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import config from '@payload-config'
import type { Product } from '@/payload-types'
import { getPayload } from 'payload'
import { AnimatedBackButton } from '@/components/animations/ProductAnimations'
import { RelatedProducts } from '@/components/RelatedProducts'
import { generateVietnameseMetadata } from '@/lib/seo'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { ContentSwitcher } from '@/components/ContentSwitcher'
import { ProductDetailClient } from './ProductDetailClient'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

async function getProductData(slug: string): Promise<Product | null> {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'products',
      depth: 2,
      where: {
        slug: { equals: slug },
      },
      limit: 1,
    })

    return result.docs[0] || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getProductData(id)

  if (!product) {
    notFound()
  }

  // Category name for back link
  const categorySlug = typeof product.category === 'object' ? product.category.slug : 'danh-muc'

  return (
    <main className="min-h-screen bg-gray-50 pt-[var(--header-height)]">
      <section className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <AnimatedBackButton href={`/danh-muc/${categorySlug}`} />

        <ProductDetailClient product={product} />

        {/* Product Details Tabs */}
        {product.description && (
          <div className="mt-6">
            <ContentSwitcher
              items={[
                {
                  default: true,
                  title: 'Chi tiết',
                  content: (
                    <div className="text-gray-600 leading-relaxed prose max-w-none">
                      <RichText data={product.description} />
                    </div>
                  ),
                },
                // {
                //   title: 'Thông số',
                //   content: <div>Thông số</div>,
                // },
              ]}
            />
          </div>
        )}
      </section>

      {/* Related Products Section */}
      {typeof product.category === 'object' && product.category?.id && (
        <RelatedProducts
          currentProductId={product.id}
          categoryId={product.category.id}
          maxItems={8}
        />
      )}
    </main>
  )
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductDetailPage params={params} />
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params

  return generateVietnameseMetadata(
    'products',
    id,
    'Sản phẩm chiếu sáng CD LIGHT',
    'Khám phá các sản phẩm chiếu sáng chất lượng cao từ CD LIGHT - Uy tín tạo nên thương hiệu',
  )
}

// export async function generateStaticParams() {
//   try {
//     const payload = await getPayload({ config })
//     const products = await payload.find({
//       collection: 'products',
//       depth: 0,
//       limit: 1000,
//     })

//     return products.docs.map((product) => ({
//       id: product.slug,
//     }))
//   } catch (error) {
//     console.error('Error generating static params:', error)
//     return []
//   }
// }
