import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Mô tả thay thế',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'general',
      label: 'Danh mục',
      options: [
        { label: 'Chung', value: 'general' },
        { label: 'Toàn cục/Website', value: 'global' },
        { label: 'Danh mục', value: 'category' },
        { label: 'Sản phẩm', value: 'product' },
        { label: 'Banner/Hero', value: 'banner' },
        { label: 'Dự án', value: 'project' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Mô tả',
      admin: {
        description: 'Mô tả tùy chọn cho tệp media này',
      },
    },
  ],
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'application/pdf'],
  },
  admin: {
    defaultColumns: ['filename', 'category', 'alt', 'updatedAt'],
    useAsTitle: 'alt',
    group: 'Nội dung',
  },
}
