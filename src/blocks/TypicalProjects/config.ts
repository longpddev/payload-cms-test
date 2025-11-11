import type { Block } from 'payload'

export const TypicalProjectsBlock: Block = {
  slug: 'typicalProjects',
  interfaceName: 'TypicalProjectsBlock',
  labels: {
    singular: 'Typical Projects',
    plural: 'Typical Projects',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Tiêu đề phần',
      defaultValue: 'Dự án tiêu biểu',
    },
    {
      name: 'selectedProjects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      label: 'Chọn dự án tiêu biểu',
      required: true,
      admin: {
        description: 'Chọn các dự án sẽ hiển thị trong phần dự án tiêu biểu trên trang chủ',
      },
    },
  ],
}
