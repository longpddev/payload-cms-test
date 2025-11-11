import type { Block } from 'payload'

export const ContactInfoBlock: Block = {
  slug: 'contactInfo',
  interfaceName: 'ContactInfoBlock',
  labels: {
    singular: 'Contact Information',
    plural: 'Contact Information',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Danh sách liên hệ',
      required: true,
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Loại thông tin',
          required: true,
          options: [
            {
              label: 'Số điện thoại',
              value: 'phone',
            },
            {
              label: 'Địa chỉ',
              value: 'address',
            },
            {
              label: 'Email',
              value: 'email',
            },
          ],
        },
        {
          name: 'value',
          type: 'text',
          label: 'Giá trị',
          required: true,
        },
      ],
    },
  ],
}
