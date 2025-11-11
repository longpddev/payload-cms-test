import type { Block } from 'payload'

export const FeaturedProductsBlock: Block = {
  slug: 'featuredProducts',
  interfaceName: 'FeaturedProductsBlock',
  labels: {
    singular: 'Featured Products',
    plural: 'Featured Products',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Tiêu đề phần',
      defaultValue: 'Sản phẩm nổi bật',
    },
    {
      name: 'selectedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      label: 'Chọn sản phẩm nổi bật',
      required: true,
      admin: {
        description: 'Chọn các sản phẩm sẽ hiển thị trong phần sản phẩm nổi bật trên trang chủ',
      },
    },
  ],
}
