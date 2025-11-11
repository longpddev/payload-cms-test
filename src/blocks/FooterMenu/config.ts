import type { Block } from 'payload'

export const FooterMenuBlock: Block = {
  slug: 'footerMenu',
  interfaceName: 'FooterMenuBlock',
  labels: {
    singular: 'Footer Menu',
    plural: 'Footer Menus',
  },
  fields: [
    {
      name: 'sections',
      type: 'array',
      label: 'Các phần menu',
      required: true,
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Tiêu đề phần',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          label: 'Danh sách liên kết',
          fields: [
            {
              name: 'linkType',
              type: 'radio',
              label: 'Loại liên kết',
              required: true,
              defaultValue: 'category',
              options: [
                {
                  label: 'Danh mục sản phẩm',
                  value: 'category',
                },
                {
                  label: 'Liên kết tùy chỉnh',
                  value: 'custom',
                },
              ],
              admin: {
                layout: 'horizontal',
              },
            },
            {
              name: 'categoryReference',
              type: 'relationship',
              relationTo: 'categories',
              label: 'Chọn danh mục',
              required: false,
              admin: {
                condition: (data, siblingData) => siblingData?.linkType === 'category',
                description: 'Tự động sử dụng tên và slug của danh mục',
              },
            },
            {
              name: 'customTitle',
              type: 'text',
              label: 'Tiêu đề liên kết',
              required: false,
              admin: {
                condition: (data, siblingData) => siblingData?.linkType === 'custom',
              },
            },
            {
              name: 'customLinkType',
              type: 'radio',
              label: 'Loại liên kết tùy chỉnh',
              required: false,
              defaultValue: 'internal',
              options: [
                {
                  label: 'Liên kết nội bộ',
                  value: 'internal',
                },
                {
                  label: 'Liên kết ngoài',
                  value: 'external',
                },
              ],
              admin: {
                condition: (data, siblingData) => siblingData?.linkType === 'custom',
                layout: 'horizontal',
              },
            },
            {
              name: 'internalLink',
              type: 'text',
              label: 'Đường dẫn nội bộ (ví dụ: /lien-he)',
              required: false,
              admin: {
                condition: (data, siblingData) =>
                  siblingData?.linkType === 'custom' && siblingData?.customLinkType === 'internal',
              },
            },
            {
              name: 'externalLink',
              type: 'text',
              label: 'Đường dẫn ngoài (ví dụ: https://example.com)',
              required: false,
              admin: {
                condition: (data, siblingData) =>
                  siblingData?.linkType === 'custom' && siblingData?.customLinkType === 'external',
              },
            },
          ],
        },
      ],
    },
  ],
}
