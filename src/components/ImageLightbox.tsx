'use client'

import React from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface ImageSlide {
  src: string
  alt?: string
}

interface ImageLightboxProps {
  isOpen: boolean
  onClose: () => void
  images: ImageSlide[]
  currentIndex: number
  darkBackground?: boolean
  closeOnBackdropClick?: boolean
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  darkBackground = false,
  closeOnBackdropClick = true,
}) => {
  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      index={currentIndex}
      slides={images}
      styles={{
        container: {
          backgroundColor: darkBackground ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.5)',
        },
      }}
      render={{
        buttonPrev: () => null,
        buttonNext: () => null,
      }}
      carousel={{
        finite: true,
      }}
      controller={{
        closeOnBackdropClick,
      }}
    />
  )
}

export default ImageLightbox
