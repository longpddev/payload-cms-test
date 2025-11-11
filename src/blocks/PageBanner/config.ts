import type { Block } from 'payload'

export const PageBannerBlock: Block = {
  slug: 'pageBanner',
  interfaceName: 'PageBannerBlock',
  labels: {
    singular: 'Page Banner',
    plural: 'Page Banners',
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
      name: 'variant',
      type: 'select',
      label: 'Kiểu hiển thị',
      defaultValue: 'image',
      options: [
        {
          label: 'Với hình ảnh',
          value: 'image',
        },
        {
          label: 'Chỉ văn bản',
          value: 'text-only',
        },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'relationship',
      relationTo: 'media',
      label: 'Hình ảnh nền',
      admin: {
        condition: (_, { variant }) => variant === 'image',
      },
    },
    {
      name: 'height',
      type: 'select',
      label: 'Chiều cao',
      defaultValue: 'medium',
      options: [
        {
          label: 'Nhỏ',
          value: 'small',
        },
        {
          label: 'Trung bình',
          value: 'medium',
        },
        {
          label: 'Lớn',
          value: 'large',
        },
      ],
      admin: {
        condition: (_, { variant }) => variant === 'image',
      },
    },
  ],
}
