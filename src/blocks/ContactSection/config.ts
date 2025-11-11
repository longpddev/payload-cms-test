import type { Block } from 'payload'

export const ContactSectionBlock: Block = {
  slug: 'contactSection',
  interfaceName: 'ContactSectionBlock',
  labels: {
    singular: 'Contact Section',
    plural: 'Contact Sections',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Tiêu đề',
              defaultValue: 'LIÊN HỆ VỚI CD LIGHT',
            },
            {
              name: 'subtitle',
              type: 'text',
              label: 'Phụ đề',
              defaultValue: 'Chuyên gia chiếu sáng hàng đầu',
            },
            {
              name: 'tagline',
              type: 'text',
              label: 'Tagline (English)',
              defaultValue: 'Lighting solutions for every space',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Mô tả',
              defaultValue:
                'CD LIGHT cam kết mang đến những giải pháp chiếu sáng tối ưu cho mọi không gian. Với kinh nghiệm nhiều năm trong ngành, chúng tôi hiểu rõ nhu cầu và mong muốn của khách hàng. Hãy liên hệ với chúng tôi để được tư vấn miễn phí và nhận báo giá tốt nhất!',
            },
          ],
        },
        {
          label: 'Form',
          fields: [
            {
              name: 'form',
              type: 'relationship',
              relationTo: 'forms',
              label: 'Chọn form liên hệ',
              required: true,
              admin: {
                description: 'Chọn form được tạo từ Form Builder để hiển thị trong section này',
              },
            },
          ],
        },
      ],
    },
  ],
}
