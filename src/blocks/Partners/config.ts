import type { Block } from 'payload'

export const PartnersBlock: Block = {
  slug: 'partners',
  interfaceName: 'PartnersBlock',
  labels: {
    singular: 'Partners Section',
    plural: 'Partners Sections',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Tiêu đề phần',
      defaultValue: 'Đối tác của chúng tôi',
    },
    {
      name: 'partners',
      type: 'array',
      label: 'Danh sách đối tác',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Tên đối tác',
          required: true,
        },
        {
          name: 'logo',
          type: 'relationship',
          relationTo: 'media',
          label: 'Logo',
          required: true,
        },
        {
          name: 'website',
          type: 'text',
          label: 'Website',
        },
      ],
    },
  ],
}
