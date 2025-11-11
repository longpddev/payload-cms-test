'use client'

import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import { useEffect } from 'react'
import Image from 'next/image'
import { TextFade } from '../animations'

interface Partner {
  id: string
  name: string
  logo: string
}

interface PartnerSectionProps {
  partners: Partner[]
  title?: string
  speed?: number
}

export default function PartnerSection({
  partners,
  title = 'Đối tác của chúng tôi',
  speed = 0.75,
}: PartnerSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      containScroll: false,
      align: 'start',
    },
    [
      AutoScroll({
        speed,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        playOnInit: true,
      }),
    ],
  )

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit()
    }
  }, [emblaApi, partners])

  if (!partners || partners.length === 0) {
    return null
  }

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners]

  return (
    <section className="py-16 bg-gray-50">
      <TextFade className="app-container" deep={100}>
        {title && <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">{title}</h2>}

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex-none mx-8 flex items-center justify-center"
              >
                <div className="relative w-62 h-62 transition-all duration-300 grayscale hover:grayscale-0 opacity-70 hover:opacity-100">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain select-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </TextFade>
    </section>
  )
}
