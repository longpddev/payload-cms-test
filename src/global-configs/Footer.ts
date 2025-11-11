import { revalidatePath } from 'next/cache'
import type { GlobalConfig } from 'payload'
import { ContactInfoBlock, FooterMenuBlock, FanpageBlock } from '@/blocks'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true, // Public access for frontend
    update: ({ req: { user } }) => Boolean(user), // Admin only
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      label: 'Footer Layout',
      blocks: [ContactInfoBlock, FooterMenuBlock, FanpageBlock],
      admin: {
        initCollapsed: true,
      },
    },
  ],
  admin: {
    group: 'Website',
    description: 'Quản lý thông tin liên hệ và menu của chân trang với khả năng sắp xếp lại thứ tự',
  },
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/')
      },
    ],
  },
}
