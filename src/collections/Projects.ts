import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { seoFields } from '@/fields/seoFields'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
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
      label: 'Tên dự án',
    },
    ...slugField('name', {
      slugOverrides: {
        label: 'Slug URL',
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
              name: 'shortDescription',
              type: 'textarea',
              required: false,
              label: 'Mô tả ngắn',
            },
            {
              name: 'previewImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Ảnh đại diện',
              filterOptions: {
                category: { equals: 'project' },
              },
            },
            {
              name: 'projectImages',
              type: 'array',
              label: 'Danh sách ảnh dự án',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  filterOptions: {
                    category: { equals: 'project' },
                  },
                },
              ],
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
