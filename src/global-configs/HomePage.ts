import type { GlobalConfig } from 'payload'
import { revalidatePath } from 'next/cache'
import {
  BannerCarouselBlock,
  HeroSliderBlock,
  TypicalProjectsBlock,
  FeaturedProductsBlock,
  PartnersBlock,
  ContentWithImageBlock,
  TestimonialSectionBlock,
  ContactSectionBlock,
} from '@/blocks'

export const HomePage: GlobalConfig = {
  slug: 'homepage',
  label: 'Home page',
  access: {
    read: () => true, // Public access for frontend
    update: ({ req: { user } }) => Boolean(user), // Admin only
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Layout',
      blocks: [
        HeroSliderBlock,
        BannerCarouselBlock,
        TypicalProjectsBlock,
        FeaturedProductsBlock,
        PartnersBlock,
        ContentWithImageBlock,
        TestimonialSectionBlock,
        ContactSectionBlock,
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/')
      },
    ],
  },
  admin: {
    group: 'Website',
    description: 'Quản lý các phần của trang chủ với khả năng sắp xếp lại thứ tự',
  },
}
