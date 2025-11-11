import type { Block } from 'payload'

export const BannerCarouselBlock: Block = {
  slug: 'bannerCarousel',
  interfaceName: 'BannerCarouselBlock',
  labels: {
    singular: 'Banner Carousel',
    plural: 'Banner Carousels',
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      label: 'Banner Slides',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Tiêu đề',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Phụ đề',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Mô tả',
        },
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          label: 'Hình ảnh',
          required: true,
        },
        {
          name: 'link',
          type: 'group',
          label: 'Link',
          fields: [
            {
              name: 'url',
              type: 'text',
              label: 'URL',
            },
            {
              name: 'text',
              type: 'text',
              label: 'Văn bản link',
            },
          ],
        },
      ],
    },
  ],
}
