import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { TextFade } from '@/components/animations'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageBanner } from '@/components/PageBanner'
import { generateFallbackMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return generateFallbackMetadata(
    'Công trình tiêu biểu - CD LIGHT',
    'Khám phá các công trình chiếu sáng tiêu biểu của CD LIGHT. Dự án LED chất lượng cao cho công trình công cộng và nhà máy.',
  )
}

export default async function ProjectsPage() {
  const payload = await getPayload({ config })

  const projects = await payload.find({
    collection: 'projects',
    limit: 100,
  })

  const projectsData = projects.docs

  return (
    <main className="min-h-screen pt-[var(--header-height)]">
      {/* Hero Section */}
      <PageBanner
        title="CÔNG TRÌNH TIÊU BIỂU"
        variant="image"
        backgroundImage="/project-banner.jpg"
      />

      {/* Projects Grid */}
      <section className="app-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectsData.map((project) => (
            <TextFade key={project.id} direction="up" staggerChildren={0.1}>
              <Link href={`/projects/${project.slug}`}>
                <div className="group bg-white overflow-hidden">
                  <div className="relative overflow-hidden">
                    <Image
                      src={
                        typeof project.previewImage === 'object' && project.previewImage?.url
                          ? project.previewImage.url
                          : '/placeholder.jpg'
                      }
                      alt={project.name}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 border border-t-0 border-gray-200">
                    <h3 className="text-lg font-quicksand font-semibold text-gray-900">
                      {project.name}
                    </h3>
                    {project.shortDescription && (
                      <p className="text-sm text-gray-600 mt-2 font-geist">
                        {project.shortDescription}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </TextFade>
          ))}
        </div>
      </section>
    </main>
  )
}
