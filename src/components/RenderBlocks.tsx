import React from 'react'
import { PageBannerBlockComponent, RichContentBlockComponent } from '@/blocks'
import type { Page } from '@/payload-types'

type Block = NonNullable<Page['layout']>[0]

export const RenderBlocks: React.FC<{ blocks: Block[] }> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'pageBanner':
            return <PageBannerBlockComponent key={index} {...block} />
          case 'richContent':
            return <RichContentBlockComponent key={index} {...block} />
          default:
            return null
        }
      })}
    </>
  )
}
