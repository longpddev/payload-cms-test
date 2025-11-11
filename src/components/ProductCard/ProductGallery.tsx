'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import ImageLightbox from '@/components/ImageLightbox'

export interface GalleryImage {
  url: string
  alt: string
  variantId?: string
}

interface ProductGalleryProps {
  images: GalleryImage[]
  productTitle: string
  initialImageIndex?: number
}

export function ProductGallery({ images, productTitle, initialImageIndex = 0 }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(initialImageIndex)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Embla carousel for thumbnails
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const handleThumbnailClick = useCallback((index: number) => {
    setSelectedIndex(index)
  }, [])

  const openLightbox = useCallback(() => {
    setIsLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false)
  }, [])

  // Prepare lightbox slides
  const lightboxSlides = images.map((image, index) => ({
    src: image.url,
    alt: image.alt || `${productTitle} - Ảnh ${index + 1}`,
  }))

  if (!images.length) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Không có hình ảnh</p>
      </div>
    )
  }

  const currentImage = images[selectedIndex] ?? images[0]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      {/* Main Image Display */}
      <div className="relative group">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg bg-white">
          {currentImage && (
            <Image
              src={currentImage.url}
              alt={currentImage.alt || `${productTitle} - Ảnh chính`}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-110"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}

          {/* Zoom overlay */}
          <motion.div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center cursor-pointer"
            whileHover={{ opacity: 1 }}
            onClick={openLightbox}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              className="bg-white/90 rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ZoomIn className="w-6 h-6 text-gray-800" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="relative">
          {/* Thumbnail Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-3">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  className={`relative flex-[0_0_auto] w-20 aspect-[4/3] cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedIndex === index
                      ? 'border-primary shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <Image
                    src={image.url}
                    alt={image.alt || `${productTitle} - Thumbnail ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                  {selectedIndex === index && <div className="absolute inset-0 bg-primary/20" />}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {images.length > 4 && (
            <>
              <motion.button
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2 shadow-md z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollPrev}
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </motion.button>
              <motion.button
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2 shadow-md z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollNext}
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </motion.button>
            </>
          )}
        </div>
      )}

      {/* Lightbox */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        images={lightboxSlides}
        currentIndex={selectedIndex}
      />
    </motion.div>
  )
}

export default ProductGallery
