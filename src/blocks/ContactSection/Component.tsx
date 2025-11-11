'use client'

import { TextFade } from '@/components/animations'
import { FormRenderer } from '@/components/FormRenderer'
import type { ContactSectionBlock } from '@/payload-types'

export const ContactSectionBlockComponent: React.FC<ContactSectionBlock> = ({
  title,
  subtitle,
  tagline,
  description,
  form,
}) => {
  if (!form || typeof form === 'string' || typeof form === 'number') {
    return (
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto">
          <div className="text-center">
            <p className="text-gray-500">No form selected for this contact section.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <TextFade direction="up" className="space-y-6" deep={100}>
            {title && <h2>{title}</h2>}

            {subtitle && <p className="text-lg">{subtitle}</p>}

            {tagline && <p className="text-gray-500 italic">{tagline}</p>}

            {description && <p className="leading-relaxed">{description}</p>}
          </TextFade>

          {/* Right Form */}
          <div className="space-y-6">
            <TextFade direction="up" deep={100}>
              <FormRenderer form={form} showLabel={false} />
            </TextFade>
          </div>
        </div>
      </div>
    </section>
  )
}
