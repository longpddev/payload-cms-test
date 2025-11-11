import { getPayload, RequiredDataFromCollectionSlug } from 'payload'
import React, { cache } from 'react'
import config from '@payload-config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { generatePageMetadata } from '@/lib/seo'
import { Metadata } from 'next'
import { RenderBlocks } from '@/components/RenderBlocks'

// export async function generateStaticParams() {
//   const payload = await getPayload({ config })
//   const pages = await payload.find({
//     collection: 'pages',
//     draft: false,
//     limit: 1000,
//     overrideAccess: false,
//     pagination: false,
//     select: {
//       slug: true,
//     },
//   })

//   const params = pages.docs
//     ?.filter((doc) => {
//       return doc.slug !== 'home'
//     })
//     .map(({ slug }) => {
//       return { slug }
//     })

//   return params
// }

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return notFound()
  }

  return (
    <main className="bg-gray-50 pt-[var(--header-height)]">
      {page.layout && page.layout.length > 0 ? (
        <RenderBlocks blocks={page.layout} />
      ) : (
        <article className="app-container py-12">
          <div className="bg-white rounded-lg p-8 w-full min-h-screen">
            <h1 className="mb-6">{page.title}</h1>
            <p className="text-gray-600">Chưa có nội dung cho trang này.</p>
          </div>
        </article>
      )}
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise

  return generatePageMetadata(slug)
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
