import type { Block } from 'payload'

export const FanpageBlock: Block = {
  slug: 'fanpage',
  interfaceName: 'FanpageBlock',
  labels: {
    singular: 'Fanpage',
    plural: 'Fanpages',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tiêu đề',
      defaultValue: 'Fanpage',
      required: true,
    },
    {
      name: 'facebookPageUrl',
      type: 'text',
      label: 'URL trang Facebook',
      defaultValue: 'https://www.facebook.com/cdlightthietbidenchieusang',
      required: true,
      admin: {
        description: 'URL của trang Facebook để hiển thị plugin fanpage',
      },
    },
    {
      name: 'width',
      type: 'number',
      label: 'Chiều rộng',
      defaultValue: 340,
      min: 180,
      max: 500,
      admin: {
        description: 'Chiều rộng của iframe fanpage (pixel)',
      },
    },
    {
      name: 'height',
      type: 'number',
      label: 'Chiều cao',
      defaultValue: 200,
      min: 70,
      max: 500,
      admin: {
        description: 'Chiều cao của iframe fanpage (pixel)',
      },
    },
    {
      name: 'showTimeline',
      type: 'checkbox',
      label: 'Hiển thị timeline',
      defaultValue: true,
      admin: {
        description: 'Hiển thị các bài đăng gần đây',
      },
    },
    {
      name: 'showFacepile',
      type: 'checkbox',
      label: 'Hiển thị danh sách fan',
      defaultValue: true,
      admin: {
        description: 'Hiển thị ảnh của những người like trang',
      },
    },
    {
      name: 'hideHeader',
      type: 'checkbox',
      label: 'Ẩn header',
      defaultValue: false,
      admin: {
        description: 'Ẩn phần header của fanpage',
      },
    },
    {
      name: 'hideCover',
      type: 'checkbox',
      label: 'Ẩn ảnh bìa',
      defaultValue: false,
      admin: {
        description: 'Ẩn ảnh bìa của trang Facebook',
      },
    },
  ],
}
