import { revalidatePath } from 'next/cache'
import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: {
    read: () => true, // Public access for frontend
    update: ({ req: { user } }) => Boolean(user), // Admin only
  },
  fields: [
    {
      name: 'logo',
      type: 'group',
      label: 'Logo',
      fields: [
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          label: 'Hình ảnh logo',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt text',
          defaultValue: 'CD Light Logo',
        },
        {
          name: 'width',
          type: 'number',
          label: 'Chiều rộng (px)',
          defaultValue: 60,
        },
        {
          name: 'height',
          type: 'number',
          label: 'Chiều cao (px)',
          defaultValue: 65,
        },
      ],
    },
    {
      name: 'navigation',
      type: 'group',
      label: 'Menu điều hướng',
      fields: [
        {
          name: 'items',
          type: 'array',
          label: 'Danh sách menu',
          required: true,
          admin: {
            initCollapsed: false,
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Tiêu đề menu',
              required: true,
            },
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
                {
                  label: 'Chỉ dropdown',
                  value: 'dropdown',
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
            {
              name: 'hasDropdown',
              type: 'checkbox',
              label: 'Có dropdown menu',
              defaultValue: false,
              admin: {
                condition: (data, siblingData) => siblingData?.linkType !== 'dropdown',
              },
            },
            {
              name: 'dropdownItems',
              type: 'array',
              label: 'Danh sách dropdown',
              admin: {
                condition: (data, siblingData) =>
                  siblingData?.hasDropdown === true || siblingData?.linkType === 'dropdown',
                initCollapsed: true,
              },
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
                      siblingData?.linkType === 'custom' &&
                      siblingData?.customLinkType === 'internal',
                  },
                },
                {
                  name: 'externalLink',
                  type: 'text',
                  label: 'Đường dẫn ngoài (ví dụ: https://example.com)',
                  required: false,
                  admin: {
                    condition: (data, siblingData) =>
                      siblingData?.linkType === 'custom' &&
                      siblingData?.customLinkType === 'external',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  admin: {
    group: 'Website',
    description: 'Quản lý logo và menu điều hướng của đầu trang',
  },
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/')
      },
    ],
  },
}
