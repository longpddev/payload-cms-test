'use client'

import Slider from '@/components/Slider'
import SliderItem from '@/components/SliderItem'
import { TextFade } from '@/components/animations'
import type { TestimonialSectionBlock } from '@/payload-types'

export const TestimonialSectionBlockComponent: React.FC<TestimonialSectionBlock> = ({
  title,
  description,
  testimonials,
  autoplay,
}) => {
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="app-container">
        <TextFade direction="up" deep={100}>
          <div className="text-center mb-12">
            {title && <h2 className="mb-4">{title}</h2>}
            {description && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
            )}
          </div>
        </TextFade>

        <Slider showArrows={false} autoplay={autoplay ?? false} className="max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <SliderItem key={index} className="px-4">
              <div className="p-8 text-center">
                <div className="mb-6">
                  <svg
                    className="w-12 h-12 text-primary mx-auto mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                  </svg>
                </div>

                <blockquote className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-1">{testimonial.author}</h4>
                  {testimonial.position && (
                    <p className="text-sm text-gray-600">
                      {testimonial.position}
                      {testimonial.company && ` - ${testimonial.company}`}
                    </p>
                  )}
                </div>
              </div>
            </SliderItem>
          ))}
        </Slider>
      </div>
    </section>
  )
}
