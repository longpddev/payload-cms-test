import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Category } from '@/payload-types'
import { CategoryCard } from '@/components/CategoryCard'
import { PageBanner } from '@/components/PageBanner'
import AnimatedGrid from '@/components/animations/AnimatedGrid'
import { generateFallbackMetadata } from '@/lib/seo'

async function getCategoriesData(): Promise<Category[]> {
  try {
    const payload = await getPayload({ config })
    const categories = await payload.find({
      collection: 'categories',
      depth: 1,
      where: {
        status: { equals: 'published' },
        parent: { exists: false }, // Only get top-level categories
      },
      sort: 'name',
    })
    return categories.docs
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

async function CategoriesPageContent() {
  const categories = await getCategoriesData()

  return (
    <main className="min-h-screen bg-gray-50 pt-[var(--header-height)]">
      <section className="app-container py-12">
        {/* Page Header */}
        <PageBanner
          title="Danh Mục Sản Phẩm"
          subtitle="Khám phá các danh mục sản phẩm chiếu sáng chất lượng cao của CD LIGHT"
          variant="text-only"
        />

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </AnimatedGrid>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Chưa có danh mục nào được tạo.</p>
          </div>
        )}
      </section>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return generateFallbackMetadata(
    'Danh mục sản phẩm - CD LIGHT',
    'Khám phá các danh mục sản phẩm chiếu sáng LED chất lượng cao của CD LIGHT - Đèn LED tiết kiệm năng lượng cho mọi ứng dụng.',
  )
}

export default function CategoriesPage() {
  return <CategoriesPageContent />
}
