import { generateFallbackMetadata } from '@/lib/seo'

export async function generateMetadata() {
  return generateFallbackMetadata(
    'Bảng giá đại lý - CD LIGHT',
    'Xem bảng giá đại lý các sản phẩm chiếu sáng LED của CD LIGHT. Giá tốt nhất cho đại lý và nhà phân phối.',
  )
}
