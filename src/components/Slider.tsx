'use client'

import { useCallback, ReactNode, FC, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'
import EmblaCarouselAutoplay from 'embla-carousel-autoplay'
import EmblaCarouselFade from 'embla-carousel-fade'
import { cn } from '@/lib/utils'

export type SliderAnimation = 'normal' | 'fade'

interface SliderProps {
  children: ReactNode
  animation?: SliderAnimation
  autoplay?: boolean
  autoplayDelay?: number
  loop?: boolean
  duration?: number
  showArrows?: boolean
  showIndicators?: boolean
  innerIndicators?: boolean
  className?: string
  align?: 'start' | 'center' | 'end'
}

const Slider: FC<SliderProps> = ({
  children,
  animation = 'normal',
  autoplay = true,
  autoplayDelay = 6000,
  loop = true,
  duration = 50,
  showArrows = true,
  showIndicators = true,
  innerIndicators = false,
  className = '',
  align = 'start',
}) => {
  const plugins = []
  const [totalSlides, setTotalSlides] = useState<number>(0)
  const [isUserActive, setUserActive] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  if (autoplay) {
    plugins.push(EmblaCarouselAutoplay({ delay: autoplayDelay }))
  }

  if (animation === 'fade') {
    plugins.push(EmblaCarouselFade())
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop,
      duration,
      align,
    },
    plugins,
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
    setUserActive(true)
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
    setUserActive(true)
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
      setUserActive(true)
    },
    [emblaApi],
  )

  const childrenArray = Array.isArray(children) ? children : [children]
  const hasMultipleSlides = childrenArray.length > 1

  useEffect(() => {
    if (!emblaApi) return

    const autoplay = emblaApi.plugins().autoplay

    if (!autoplay) return

    if (isUserActive) {
      autoplay.stop()
    } else {
      autoplay.play()
    }
  }, [emblaApi, isUserActive])

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserActive(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [isUserActive])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('resize', () => {
      setTotalSlides(emblaApi.scrollSnapList().length)
    })

    setTotalSlides(emblaApi.scrollSnapList().length)

    emblaApi.on('select', onSelect)
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  return (
    <motion.div
      className={`w-full h-full ${className} flex flex-col relative`}
      whileHover="visible"
      initial="hidden"
    >
      <div className="relative flex-1 overflow-hidden" ref={hasMultipleSlides ? emblaRef : null}>
        <div className="flex h-full">{children}</div>

        {hasMultipleSlides && showArrows && (
          <>
            <motion.button
              variants={{
                visible: {
                  opacity: 1,
                  translateX: 0,
                  transition: {
                    duration: 0.5,
                  },
                },
                hidden: {
                  opacity: 0,
                  translateX: '-100%',
                  transition: {
                    duration: 0.5,
                  },
                },
              }}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 border-none shadow-none text-gray-500 hover:text-primary h-full bg-linear-to-r from-white/30 to-transparent px-4"
              onClick={scrollPrev}
            >
              <ChevronLeft className="size-8" />
            </motion.button>
            <motion.button
              variants={{
                visible: {
                  opacity: 1,
                  translateX: 0,
                },
                hidden: {
                  opacity: 0,
                  translateX: '100%',
                },
              }}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 border-none shadow-none text-stone-600 hover:text-primary h-full bg-linear-to-l from-white/30 to-transparent px-4"
              onClick={scrollNext}
            >
              <ChevronRight className="size-8" />
            </motion.button>
          </>
        )}
      </div>

      {hasMultipleSlides && showIndicators && (
        <div
          className={cn('flex justify-center gap-2 py-4', {
            'absolute bottom-0 left-0 w-full': innerIndicators,
          })}
        >
          {Array.from(new Array(totalSlides), (_el, index) => (
            <button
              key={index}
              className={cn(
                'w-3 h-3 scale-75 rounded-full cursor-pointer transition-all duration-300 ease-in-out',
                'border border-gray-300 hover:bg-primary hover:shadow-md hover:shadow-primary/50',
                index === selectedIndex ? 'bg-primary scale-100 border-primary' : '',
              )}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default Slider
