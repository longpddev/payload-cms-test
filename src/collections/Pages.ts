import { seoFields } from '@/fields/seoFields'
import { slugField } from '@/fields/slug'
import { PageBannerBlock, RichContentBlock } from '@/blocks'
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Trang',
    plural: 'Các trang',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Tiêu đề',
      type: 'text',
      required: true,
    },
    ...slugField('title', {
      slugOverrides: {
        label: 'Đường dẫn',
        required: true,
        unique: true,
      },
    }),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Nội dung',
          fields: [
            {
              name: 'excerpt',
              label: 'Mô tả ngắn',
              type: 'textarea',
              admin: {
                description: 'Mô tả ngắn gọn về trang này, sử dụng cho SEO',
              },
            },
            {
              name: 'layout',
              label: 'Bố cục trang',
              type: 'blocks',
              blocks: [PageBannerBlock, RichContentBlock],
              admin: {
                initCollapsed: true,
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
      name: 'status',
      label: 'Trạng thái',
      type: 'select',
      defaultValue: 'published',
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
    },
  ],
}
