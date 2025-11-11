'use client'

import Slider from '@/components/Slider'
import SliderItem from '@/components/SliderItem'
import { TextFade } from '@/components/animations'

interface Testimonial {
  id: string
  quote: string
  author: string
  position?: string
  company?: string
}

const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      'CD LIGHT đã mang lại giải pháp chiếu sáng hoàn hảo cho dự án của chúng tôi. Chất lượng sản phẩm và dịch vụ tư vấn rất chuyên nghiệp.',
    author: 'Nguyễn Văn A',
    position: 'Giám đốc Dự án',
    company: 'Công ty ABC',
  },
  {
    id: '2',
    quote:
      'Những sản phẩm đèn LED của CD LIGHT không chỉ tiết kiệm điện mà còn tạo ra không gian ánh sáng ấm áp và hiện đại cho văn phòng.',
    author: 'Trần Thị B',
    position: 'Quản lý Cơ sở vật chất',
    company: 'Tập đoàn XYZ',
  },
  {
    id: '3',
    quote:
      'Dịch vụ hậu mãi tuyệt vời! Đội ngũ kỹ thuật luôn sẵn sàng hỗ trợ và bảo trì hệ thống chiếu sáng một cách nhanh chóng.',
    author: 'Lê Văn C',
    position: 'Chủ đầu tư',
    company: 'Dự án DEF',
  },
  {
    id: '4',
    quote:
      'CD LIGHT đã giúp chúng tôi giảm 40% chi phí điện năng nhờ những giải pháp chiếu sáng thông minh và hiệu quả.',
    author: 'Phạm Thị D',
    position: 'Giám đốc Vận hành',
    company: 'Khách sạn GHI',
  },
]

export default function TestimonialSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="app-container">
        <TextFade direction="up" deep={100}>
          <div className="text-center mb-12">
            <h2 className="mb-4">Khách hàng nói gì về chúng tôi</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những phản hồi chân thực từ khách hàng đã tin tưởng sử dụng sản phẩm và dịch vụ của CD
              LIGHT
            </p>
          </div>
        </TextFade>

        <Slider showArrows={false} autoplay={true} className="max-w-4xl mx-auto">
          {mockTestimonials.map((testimonial) => (
            <SliderItem key={testimonial.id} className="px-4">
              <div className="p-8 text-center">
                <div className="mb-6">
                  <svg
                    className="w-12 h-12 text-primary mx-auto mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                  </svg>
                </div>

                <blockquote className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-1">{testimonial.author}</h4>
                  {testimonial.position && (
                    <p className="text-sm text-gray-600">
                      {testimonial.position}
                      {testimonial.company && ` - ${testimonial.company}`}
                    </p>
                  )}
                </div>
              </div>
            </SliderItem>
          ))}
        </Slider>
      </div>
    </section>
  )
}
