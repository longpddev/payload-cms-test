'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState, useMemo, useEffect, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { debounce } from 'es-toolkit'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { IconLoading } from '../PageLoadingAnimation'

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`

const PdfViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    const handleResize = debounce(() => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth)
      }
    }, 200)

    handleResize() // Initial width
    window.addEventListener('resize', handleResize) // Update on resize
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Memoize the file object to prevent unnecessary re-renders
  const file = useMemo(() => ({ url: pdfUrl }), [pdfUrl])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setError(null)
  }

  const onDocumentLoadError = (error: Error) => {
    setError('Không thể tải file PDF. Vui lòng thử lại sau.')
    console.error('PDF load error:', error)
  }

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => Math.min(Math.max(1, prevPageNumber + offset), numPages))
  }

  const previousPage = () => changePage(-1)
  const nextPage = () => changePage(1)
  return (
    <>
      {/* Compact Navigation Controls */}
      {/* PDF Viewer */}
      <div className="app-container pt-2 relative">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden" ref={containerRef}>
          {error ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="text-red-500 text-lg font-medium mb-2">Lỗi tải file</div>
                <div className="text-gray-600 mb-4">{error}</div>
                <Button onClick={() => window.location.reload()} variant="outline">
                  Thử lại
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center p-2">
              <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                // options={options}
                loading={
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <IconLoading />
                      <div className="text-gray-600">Đang tải PDF...</div>
                    </div>
                  </div>
                }
                error={
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="text-red-500 text-lg font-medium mb-2">
                        Không thể hiển thị PDF
                      </div>
                      <div className="text-gray-600">Vui lòng thử lại sau</div>
                    </div>
                  </div>
                }
              >
                {Array.from(new Array(numPages), (_el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={width}
                    className={cn({
                      hidden: index + 1 !== pageNumber,
                    })}
                    loading={
                      <div className="flex items-center justify-center h-64">
                        <IconLoading />
                      </div>
                    }
                    error={
                      <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                          <div className="text-red-500 text-sm font-medium mb-2">
                            Lỗi hiển thị trang
                          </div>
                        </div>
                      </div>
                    }
                  />
                ))}
              </Document>
            </div>
          )}
        </div>
        {numPages > 0 && (
          <div className="bg-gray-50 border sticky bottom-0 z-10">
            <div className="app-container py-2">
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={previousPage}
                  disabled={pageNumber <= 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1">Trước</span>
                </Button>
                <span className="text-sm text-gray-700 px-3 py-1 bg-gray-50 rounded">
                  Trang {pageNumber} / {numPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextPage}
                  disabled={pageNumber >= numPages}
                >
                  <span className="hidden sm:inline mr-1">Sau</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default PdfViewer
