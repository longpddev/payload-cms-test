import type { Block } from 'payload'

export const RichContentBlock: Block = {
  slug: 'richContent',
  interfaceName: 'RichContentBlock',
  labels: {
    singular: 'Rich Content',
    plural: 'Rich Content',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: 'Nội dung',
      required: true,
    },
    {
      name: 'containerClass',
      type: 'select',
      label: 'Kiểu container',
      defaultValue: 'default',
      options: [
        {
          label: 'Mặc định',
          value: 'default',
        },
        {
          label: 'Rộng',
          value: 'wide',
        },
        {
          label: 'Toàn màn hình',
          value: 'full-width',
        },
      ],
    },
  ],
}
