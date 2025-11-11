'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'motion/react'
import Masonry from 'react-masonry-css'
import ImageLightbox from '@/components/ImageLightbox'

interface ProjectImage {
  url: string
}

interface Props {
  images: ProjectImage[]
  projectName: string
  projectDescription?: string
}

const ImageItem = ({
  image,
  index,
  onClick,
}: {
  image: ProjectImage
  index: number
  onClick: (index: number) => void
}) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
      className="mb-4 group cursor-pointer"
      onClick={() => onClick(index)}
    >
      <div className="relative overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300">
        <Image
          src={image.url}
          alt="Project Image"
          width={1000}
          height={1000}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <motion.div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center"
          whileHover={{ opacity: 1 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            className="bg-white/90 rounded-full p-3 shadow-lg"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ProjectGallery({ images, projectName, projectDescription }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  }

  const openLightbox = (index: number) => {
    setPhotoIndex(index)
    setIsOpen(true)
  }

  const slides = images.map((image) => ({
    src: image.url,
    alt: 'Project Image',
  }))

  return (
    <div className="min-h-screen bg-gray-50 pt-[var(--header-height)]">
      {/* Header Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl md:text-3xl font-quicksand font-semibold text-gray-900">
              {projectName}
            </h1>
            {projectDescription && <p className="text-gray-600 font-geist">{projectDescription}</p>}
          </motion.div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {images.map((image, index) => (
            <ImageItem key={index} image={image} index={index} onClick={openLightbox} />
          ))}
        </Masonry>
      </section>

      {/* Lightbox */}
      <ImageLightbox
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        images={slides}
        currentIndex={photoIndex}
      />
    </div>
  )
}
