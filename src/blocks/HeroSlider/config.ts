import type { Block } from 'payload'

export const HeroSliderBlock: Block = {
  slug: 'heroSlider',
  interfaceName: 'HeroSliderBlock',
  labels: {
    singular: 'Hero Slider',
    plural: 'Hero Sliders',
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      label: 'Slides',
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
          name: 'backgroundImage',
          type: 'relationship',
          relationTo: 'media',
          label: 'Hình nền',
          required: true,
        },
        {
          name: 'cta',
          type: 'group',
          label: 'CTA',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Nội dung nút',
              defaultValue: 'Xem thêm',
            },
            {
              name: 'url',
              type: 'text',
              label: 'Đường dẫn',
              required: true,
            },
            {
              name: 'openInNewTab',
              type: 'checkbox',
              label: 'Mở tab mới',
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}
