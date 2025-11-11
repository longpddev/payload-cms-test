import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import config from '@payload-config'
import type { Category, Product } from '@/payload-types'
import { ProductCard } from '@/components/ProductCard'
import { CategoryCard } from '@/components/CategoryCard'
import { AnimatedEmptyState } from '@/components/animations/AnimatedHeader'
import AnimatedGrid from '@/components/animations/AnimatedGrid'
import { getPayload } from 'payload'
import { PageBanner } from '@/components/PageBanner'
import { generateVietnameseMetadata } from '@/lib/seo'
interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

async function getCategoryData(slug: string): Promise<{
  category: Category | null
  products: Product[]
  subcategories: Category[]
}> {
  try {
    const payload = await getPayload({ config })

    // Find the category by slug with subcategories
    const categoryResult = await payload.find({
      collection: 'categories',
      depth: 2,
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      limit: 1,
    })

    const category = categoryResult.docs[0] || null

    if (!category) {
      return { category: null, products: [], subcategories: [] }
    }

    // Check if category has subcategories
    const subcategories = (
      await payload.find({
        collection: 'categories',
        where: {
          parent: { equals: category.id },
        },
      })
    ).docs

    if (subcategories.length > 0) {
      // Also fetch products that directly belong to this main category
      const productsResult = await payload.find({
        collection: 'products',
        depth: 1,
        where: {
          category: { equals: category.id },
        },
        sort: 'title',
      })

      return {
        category,
        products: productsResult.docs,
        subcategories,
      }
    } else {
      // If no subcategories, fetch products directly for this category
      const productsResult = await payload.find({
        collection: 'products',
        depth: 1,
        where: {
          category: { equals: category.id },
        },
        sort: 'title',
      })

      return {
        category,
        products: productsResult.docs,
        subcategories: [],
      }
    }
  } catch (error) {
    console.error('Error fetching category data:', error)
    return { category: null, products: [], subcategories: [] }
  }
}

async function CategoryPageContent({ params }: CategoryPageProps) {
  const { slug } = await params
  const { category, products, subcategories } = await getCategoryData(slug)

  if (!category) {
    notFound()
  }

  const hasSubcategories = subcategories.length > 0

  const productsChildren = (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  )

  return (
    <main className="min-h-screen bg-gray-50 pt-[var(--header-height)]">
      {/* Banner Section */}
      <PageBanner
        variant="image"
        title={category.name}
        subtitle={category.shortDescription || undefined}
        backgroundImage={
          typeof category.bannerImage === 'object' && category.bannerImage?.url
            ? category.bannerImage.url
            : '/placeholder-banner.jpg'
        }
      />

      {/* Content Section */}
      <section className="app-container py-12">
        {hasSubcategories ? (
          // Render both subcategories and direct products
          <>
            {/* Subcategories Section */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-quicksand font-bold text-gray-900 mb-2">
                Phân loại sản phẩm
              </h2>
            </div>

            <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {subcategories.map((subcategory, index) => (
                <CategoryCard key={subcategory.id} category={subcategory} index={index} />
              ))}
            </AnimatedGrid>

            {/* Direct Products Section */}
            {products.length > 0 && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-quicksand font-bold text-gray-900 mb-2">
                    Sản phẩm
                  </h2>
                </div>

                {productsChildren}
              </>
            )}
          </>
        ) : (
          // Render direct products (no subcategories)
          <>
            {products.length > 0 ? (
              productsChildren
            ) : (
              <AnimatedEmptyState
                title="Chưa Có Sản Phẩm"
                subtitle="Danh mục này hiện tại chưa có sản phẩm nào."
              />
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryPageContent params={params} />
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params

  return generateVietnameseMetadata(
    'categories',
    slug,
    'Danh mục sản phẩm CD LIGHT',
    'Khám phá các danh mục sản phẩm chiếu sáng chất lượng cao từ CD LIGHT - Uy tín tạo nên thương hiệu',
  )
}

// export async function generateStaticParams() {
//   try {
//     const payload = await getPayload({ config })
//     const categories = await payload.find({
//       collection: 'categories',
//       depth: 0,
//       where: {
//         status: { equals: 'published' },
//       },
//       limit: 1000,
//     })

//     return categories.docs.map((category) => ({
//       slug: category.slug,
//     }))
//   } catch (error) {
//     console.error('Error generating static params:', error)
//     return []
//   }
// }
