import type { Block } from 'payload'

export const ContentWithImageBlock: Block = {
  slug: 'contentWithImage',
  interfaceName: 'ContentWithImageBlock',
  labels: {
    singular: 'Content with Image',
    plural: 'Content with Image',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Label',
      defaultValue: 'Dự án',
    },
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Tiêu đề phần',
      defaultValue: 'Content với hình ảnh',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Danh sách content',
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
          name: 'description',
          type: 'textarea',
          label: 'Mô tả',
          required: true,
        },
        {
          name: 'picture',
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
