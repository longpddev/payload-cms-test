import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { seoFields } from '@/fields/seoFields'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'parent', 'updatedAt'],
    listSearchableFields: ['name', 'slug', 'shortDescription'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Tên danh mục',
    },
    ...slugField('name', {
      slugOverrides: {
        label: 'Slug URL',
        required: true,
        unique: true,
        admin: {
          description: 'Mã nhận diện thân thiện với URL cho danh mục này',
        },
      },
    }),
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Mô tả ngắn',
      admin: {
        description: 'Mô tả ngắn gọn về danh mục',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Nội dung',
          fields: [
            {
              name: 'bannerImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Ảnh banner',
              filterOptions: {
                category: { in: ['category', 'banner'] },
              },
              admin: {
                description: 'Ảnh banner cho danh mục này',
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
