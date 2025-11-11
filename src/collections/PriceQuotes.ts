import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { seoFields } from '@/fields/seoFields'

export const PriceQuotes: CollectionConfig = {
  slug: 'priceQuotes',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'publishedDate', 'updatedAt'],
    listSearchableFields: ['name', 'slug'],
    group: 'Nội dung',
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'price-quotes',
    mimeTypes: ['application/pdf'],
    adminThumbnail: ({ doc }) => `/price-quotes/${doc.filename}`,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Tên bảng giá',
      admin: {
        description: 'Tên hiển thị của bảng giá (ví dụ: "Bảng Giá Đại Lý CD LIGHT")',
      },
    },
    ...slugField('name', {
      slugOverrides: {
        label: 'Slug URL',
        required: true,
        unique: true,
        admin: {
          description: 'Đường dẫn URL cho trang bảng giá (ví dụ: dai-ly-t12-2023)',
        },
      },
    }),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Thông tin',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              required: false,
              label: 'Mô tả',
              admin: {
                description: 'Mô tả tùy chọn cho bảng giá này',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [...seoFields()],
        },
      ],
    },
    // Sidebar fields
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      label: 'Ngày phát hành',
      admin: {
        position: 'sidebar',
        description: 'Ngày phát hành của bảng giá',
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      label: 'Trạng thái',
      options: [
        {
          label: 'Đã xuất bản',
          value: 'published',
        },
        {
          label: 'Bản nháp',
          value: 'draft',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
