import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { slugField } from '@/fields/slug'
import { seoFields } from '@/fields/seoFields'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'category', 'updatedAt'],
    listSearchableFields: ['title', 'slug', 'shortDescription'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Tên sản phẩm',
    },
    ...slugField('title', {
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
              name: 'previewImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Ảnh đại diện',
              filterOptions: {
                category: { equals: 'product' },
              },
            },
            {
              name: 'previewBackImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Ảnh kĩ thuật',
              filterOptions: {
                category: { equals: 'product' },
              },
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              required: false,
              label: 'Mô tả ngắn',
            },
            {
              name: 'description',
              type: 'richText',
              label: 'Mô tả chi tiết',
              editor: lexicalEditor(),
            },
          ],
        },
        {
          label: 'Thông tin',
          fields: [
            {
              name: 'unit',
              type: 'select',
              required: false,
              label: 'Đơn vị tính',
              defaultValue: 'piece',
              options: [
                {
                  label: 'Theo cái',
                  value: 'piece',
                },
                {
                  label: 'Theo mét',
                  value: 'meter',
                },
              ],
              admin: {
                description: 'Đơn vị tính giá cho sản phẩm. Mặc định là theo cái.',
              },
            },
            {
              name: 'variants',
              type: 'array',
              label: 'Các option sản phẩm',
              minRows: 1,
              admin: {
                description: 'Mỗi option cần mã sản phẩm, giá và ít nhất một ảnh.',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  label: 'Tên option',
                },
                {
                  name: 'code',
                  type: 'text',
                  required: true,
                  label: 'Mã sản phẩm',
                },
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  label: 'Giá (VNĐ)',
                  admin: {
                    description: 'Giá option tính bằng VNĐ.',
                  },
                },
                {
                  name: 'images',
                  type: 'array',
                  minRows: 1,
                  label: 'Ảnh option',
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
                        category: { equals: 'product' },
                      },
                    },
                  ],
                },
                {
                  name: 'isDefault',
                  type: 'checkbox',
                  label: 'Sử dụng làm option mặc định',
                  defaultValue: false,
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
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Danh mục',
      admin: {
        position: 'sidebar',
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
