import React from 'react'
import {
  ContactInfoBlockComponent,
  FooterMenuBlockComponent,
  FanpageBlockComponent,
} from '@/blocks'
import type { ContactInfoBlock, FooterMenuBlock, FanpageBlock } from '@/payload-types'

type FooterBlockType = ContactInfoBlock | FooterMenuBlock | FanpageBlock

export const RenderFooterBlocks: React.FC<{
  blocks: FooterBlockType[] | null | undefined
}> = ({ blocks }) => {
  return (
    <>
      {blocks?.map((block, index) => {
        switch (block.blockType) {
          case 'contactInfo':
            return <ContactInfoBlockComponent key={index} {...block} />
          case 'footerMenu':
            return <FooterMenuBlockComponent key={index} {...block} />
          case 'fanpage':
            return <FanpageBlockComponent key={index} {...block} />
          default:
            return null
        }
      })}
    </>
  )
}
