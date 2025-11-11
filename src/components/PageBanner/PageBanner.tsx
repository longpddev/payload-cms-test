'use client'

import React, { useEffect, useRef } from 'react'
import Image, { ImageProps } from 'next/image'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import ImageBackgroundAttachment from '../ImageBackgroundAttachment'

interface PageBannerProps {
  title?: string
  subtitle?: string
  backgroundImage?: string
  variant?: 'text-only' | 'image'
  height?: 'small' | 'medium' | 'large'
  className?: string
}

export function PageBanner({
  title,
  subtitle,
  backgroundImage,
  variant = 'image',
  height = 'medium',
  className,
}: PageBannerProps) {
  const heightClasses = {
    small: 'h-[400px]',
    medium: 'h-[500px]',
    large: 'h-[500px] md:h-[600px]',
  }

  if (variant === 'image' && backgroundImage) {
    return (
      <section
        className={cn(
          'relative flex items-center justify-center overflow-hidden',
          heightClasses[height],
          className,
        )}
        // style={{
        //   backgroundImage: `url(${backgroundImage})`,
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'center',
        //   backgroundAttachment: 'fixed',
        // }}
      >
        <ImageBackgroundAttachment
          src={backgroundImage}
          alt={title || ''}
          width={1920}
          height={300}
          property="background"
          className="absolute inset-0 object-cover w-full h-full block object-center"
        />

        {title && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
            <div className="relative z-10 container mx-auto text-center px-4">
              <motion.h1
                className="text-3xl md:text-5xl lg:text-6xl font-quicksand tracking-wider text-white font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {title}
              </motion.h1>
              {subtitle && (
                <motion.p
                  className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {subtitle}
                </motion.p>
              )}
            </div>
          </>
        )}
      </section>
    )
  }

  // Simple banner variant (like contact page with just image)
  if (variant === 'image' && !backgroundImage) {
    console.warn('PageBanner: backgroundImage is required when variant is "image"')
  }

  // Text-only variant (like categories page)
  return (
    <div className={cn('text-center mb-12 py-8', className)}>
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-quicksand"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          className="text-lg text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

// Simple image banner variant (for contact page style)
interface SimpleImageBannerProps {
  src: string
  alt: string
  className?: string
}

export function SimpleImageBanner({ src, alt, className }: SimpleImageBannerProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1486}
      height={1080}
      className={cn('w-full max-h-[600px] object-cover object-center', className)}
    />
  )
}
