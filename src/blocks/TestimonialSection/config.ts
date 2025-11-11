import type { Block } from 'payload'

export const TestimonialSectionBlock: Block = {
  slug: 'testimonialSection',
  interfaceName: 'TestimonialSectionBlock',
  labels: {
    singular: 'Testimonial Section',
    plural: 'Testimonial Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tiêu đề',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Mô tả',
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Danh sách đánh giá',
      required: true,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          label: 'Nội dung đánh giá',
          required: true,
        },
        {
          name: 'author',
          type: 'text',
          label: 'Tên khách hàng',
          required: true,
        },
        {
          name: 'position',
          type: 'text',
          label: 'Chức vụ',
        },
        {
          name: 'company',
          type: 'text',
          label: 'Công ty',
        },
      ],
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      label: 'Tự động chuyển slide',
      defaultValue: true,
    },
  ],
}
