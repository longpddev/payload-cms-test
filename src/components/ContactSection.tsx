'use client'

import { TextFade } from '@/components/animations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function ContactSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-100 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <TextFade direction="up" className="space-y-6" deep={100}>
            <h2>LIÊN HỆ VỚI CD LIGHT</h2>

            <p className="text-lg">Chuyên gia chiếu sáng hàng đầu</p>
            <p className="text-gray-500 italic">Lighting solutions for every space</p>

            <p className="leading-relaxed">
              CD LIGHT cam kết mang đến những giải pháp chiếu sáng tối ưu cho mọi không gian. Với
              kinh nghiệm nhiều năm trong ngành, chúng tôi hiểu rõ nhu cầu và mong muốn của khách
              hàng. Hãy liên hệ với chúng tôi để được tư vấn miễn phí và nhận báo giá tốt nhất!
            </p>
          </TextFade>

          {/* Right Form */}
          <div className="space-y-6">
            <TextFade direction="up" deep={100}>
              <form className="space-y-4">
                <Input className="h-14" type="text" placeholder="Họ Và Tên *" required />
                <Input className="h-14" type="tel" placeholder="Số Điện Thoại *" required />
                <Input className="h-14" type="email" placeholder="Email" />
                <Textarea className="h-28" placeholder="Lời nhắn" rows={12} />
                <Button type="submit" size="lg" className="w-full">
                  Gửi
                </Button>
              </form>
            </TextFade>
          </div>
        </div>
      </div>
    </section>
  )
}
