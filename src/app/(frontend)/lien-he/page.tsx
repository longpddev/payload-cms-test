import React from 'react'
import type { Metadata } from 'next'
import { Mail, Phone, MapPin, ExternalLink, Facebook } from 'lucide-react'
import { PageBanner } from '@/components/PageBanner'
import { generateFallbackMetadata } from '@/lib/seo'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { MapTabs } from '@/components/MapTabs'
import TiktokSvg from '@/assets/tiktok-svg'

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 pt-[var(--header-height)]">
      <PageBanner backgroundImage="/banner-contact.png" />

      {/* Contact Information Section */}
      <section className="app-container py-12">
        <div className="mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Details - moved to left */}
            <div className="bg-white rounded-lg p-8">
              <h2 className="mb-6">Thông Tin Liên Hệ</h2>

              <div className="space-y-6">
                {/* Phone Numbers */}
                <div className="space-y-4">
                  <h3 className="text-lg">Điện Thoại / Zalo</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-gray-900">Hà Nội</p>
                        <a
                          href="tel:0935269889"
                          className="text-gray-700 hover:text-primary transition-colors"
                        >
                          093 526 9889
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-gray-900">Hồ Chí Minh</p>
                        <a
                          href="tel:0915782877"
                          className="text-gray-700 hover:text-primary transition-colors"
                        >
                          091 578 2877
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a
                      href="mailto:cdlightcompany@gmail.com"
                      className="text-primary hover:underline"
                    >
                      cdlightcompany@gmail.com
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div className="space-y-4">
                  <h3 className="text-lg">Mạng Xã Hội</h3>
                  <div className="space-y-3">
                    <a
                      href="https://www.tiktok.com/@cdlight.vn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-gray-700 hover:text-primary transition-colors"
                    >
                      <TiktokSvg className="w-5 h-5" />
                      <span>TikTok: @cdlight.vn</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.facebook.com/cdlightthietbidenchieusang"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-gray-700 hover:text-primary transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                      <span>Facebook: CD Light – Thiết bị chiếu sáng</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Addresses */}
                <div className="space-y-4">
                  <h3 className="text-lg">Địa Chỉ</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Chi nhánh Hà Nội</p>
                        <p className="text-gray-700">Điện thoại: 093 526 9889</p>
                        <div className="mt-2 space-y-1 text-gray-700">
                          <p>90 TT1 - KĐT Văn Phú - Phú La - Hà Đông - TP Hà Nội (Cũ)</p>
                          <p>90TT1 - KĐT Văn Phú - Phường Kiến Hưng - TP Hà Nội (Mới)</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Chi nhánh Hồ Chí Minh</p>
                        <p className="text-gray-700">Điện thoại: 091 578 2877</p>
                        <div className="mt-2 space-y-1 text-gray-700">
                          <p>Số 52 Thới An 06 - Thới An - Q12 - TP HCM (Cũ)</p>
                          <p>Số 52 Thới An 06 - Phường Thới An - TP HCM (Mới)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg p-8">
              <h2 className="mb-6">Liên Hệ</h2>

              <form className="space-y-6">
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="Họ Và Tên *"
                />

                <Input type="email" id="email" name="email" placeholder="Email" />

                <Input type="tel" id="phone" name="phone" required placeholder="Số Điện Thoại *" />

                <Textarea id="message" name="message" rows={5} placeholder="Lời nhắn" />

                <Button type="submit" className="w-full">
                  Liên Hệ
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="app-container pb-12">
        <div className="bg-white rounded-lg p-8">
          <MapTabs />
        </div>
      </section>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return generateFallbackMetadata(
    'Liên hệ - CD LIGHT',
    'Liên hệ với CD LIGHT để được tư vấn về các sản phẩm chiếu sáng LED chất lượng cao. Địa chỉ Hà Nội và TP.HCM.',
  )
}

export default ContactPage
