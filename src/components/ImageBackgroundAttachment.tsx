import Image, { ImageProps } from 'next/image'
import React, { useEffect, useRef } from 'react'

const ImageBackgroundAttachment = ({ src, alt, ...props }: ImageProps) => {
  const ref = useRef<HTMLImageElement>(null)
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        ref.current.style.transform = `translateY(${window.scrollY}px)`
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return <Image ref={ref} src={src} alt={alt} {...props} />
}

export default ImageBackgroundAttachment
