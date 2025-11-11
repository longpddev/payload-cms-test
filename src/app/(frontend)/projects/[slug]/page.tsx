import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import ProjectGallery from './ProjectGallery'
import { generateVietnameseMetadata } from '@/lib/seo'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const projects = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (projects.docs.length === 0) {
    notFound()
  }

  const project = projects.docs[0]

  const projectImages =
    project.projectImages
      ?.map((item) => ({
        url: typeof item.image === 'object' && item.image?.url ? item.image.url : '',
      }))
      .filter((img) => img.url) || []

  return (
    <ProjectGallery
      images={projectImages}
      projectName={project.name}
      projectDescription={project.shortDescription || undefined}
    />
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  return generateVietnameseMetadata(
    'projects',
    slug,
    'Dự án CD LIGHT',
    'Khám phá các dự án chiếu sáng tiêu biểu của CD LIGHT - Uy tín tạo nên thương hiệu',
  )
}

// export async function generateStaticParams() {
//   const payload = await getPayload({ config })
//   const projects = await payload.find({
//     collection: 'projects',
//     depth: 0,
//     limit: 1000,
//   })

//   return projects.docs.map((project) => ({
//     slug: project.slug,
//   }))
// }
