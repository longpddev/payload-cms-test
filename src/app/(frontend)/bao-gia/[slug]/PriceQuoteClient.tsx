'use client'

import dynamic from 'next/dynamic'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { PriceQuote } from '@/payload-types'
import { IconLoading } from '@/components/PageLoadingAnimation'

// Dynamically import react-pdf components to avoid SSR issues
const PdfViewer = dynamic(() => import('@/components/PdfViewer/PdfViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <IconLoading />
    </div>
  ),
})

interface PriceQuoteClientProps {
  priceQuote: PriceQuote
}

const PriceQuoteClient = ({ priceQuote }: PriceQuoteClientProps) => {
  const pdfUrl = typeof priceQuote.url === 'string' ? priceQuote.url : ''

  // Format the published date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      month: 'long',
      year: 'numeric',
    })
  }

  const downloadPDF = () => {
    if (!pdfUrl) return

    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = priceQuote.filename || `${priceQuote.name}.pdf`
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-[var(--header-height)] pb-12">
      {/* Compact Header */}
      <div className=" bg-white shadow-sm border-b">
        <div className="app-container py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{priceQuote.name}</h1>
              <p className="text-xs text-gray-500">{formatDate(priceQuote.publishedDate)}</p>
            </div>
            <Button variant="outline" size="sm" onClick={downloadPDF}>
              <Download className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Tải PDF</span>
            </Button>
          </div>
        </div>
      </div>
      <PdfViewer pdfUrl={pdfUrl} />
    </div>
  )
}

export default PriceQuoteClient
