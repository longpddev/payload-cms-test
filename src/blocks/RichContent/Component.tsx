import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { cn } from '@/lib/utils'
import { RichContentBlock } from '@/payload-types'

export const RichContentBlockComponent: React.FC<RichContentBlock> = ({
  content,
  containerClass = 'default',
}) => {
  const containerClasses = {
    default: 'bg-white rounded-lg p-8 w-full',
    wide: 'bg-white rounded-lg p-12 w-full max-w-5xl mx-auto',
    'full-width': 'bg-white w-full px-4 md:px-8 py-8',
  }

  return (
    <section className="app-container py-12">
      <div className={cn(containerClasses[containerClass ?? 'default'])}>
        <RichText data={content} />
      </div>
    </section>
  )
}
