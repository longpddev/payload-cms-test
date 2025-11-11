import type { Metadata } from 'next'
import { Geist, Geist_Mono, Montserrat, Quicksand } from 'next/font/google'
import './globals.css'
import './style-guide.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer/Footer'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getServerSideURL } from '@/utilities/get-url'
import { Analytics } from '@vercel/analytics/next'
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
})

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    template: '%s | CD LIGHT',
    default: 'CD LIGHT - Uy tín tạo nên thương hiệu',
  },
  description:
    'CD LIGHT - Công ty cổ phần thương mại và dịch vụ CD chuyên cung cấp các sản phẩm chiếu sáng LED chất lượng cao',
  keywords: [
    'CD LIGHT',
    'đèn LED',
    'chiếu sáng',
    'thiết bị chiếu sáng',
    'LED tiết kiệm năng lượng',
  ],
  authors: [{ name: 'CD LIGHT' }],
  creator: 'CD LIGHT',
  publisher: 'Công ty cổ phần thương mại và dịch vụ CD',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'msapplication-TileImage', url: '/ms-tile-image.png' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${quicksand.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
