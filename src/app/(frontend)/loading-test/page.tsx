'use client'

import { useState } from 'react'
import PageLoadingAnimation from '@/components/PageLoadingAnimation'

export default function LoadingTestPage() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Loading Animation Test</h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4">Animation Controls</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setIsLoading(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Show Loading
            </button>
            <button
              onClick={() => setIsLoading(false)}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Hide Loading
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-4">Sample Content</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              This is sample content to demonstrate how the loading animation overlays the page. The
              loading animation should appear with a white background covering the entire viewport.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Feature 1</h3>
                <p className="text-blue-700">Sample content for testing purposes.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Feature 2</h3>
                <p className="text-green-700">More sample content for the demo.</p>
              </div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-3">Animation Details</h3>
              <ul className="text-purple-700 space-y-2">
                <li>• Fixed positioning covers entire viewport</li>
                <li>• White background with centered animation</li>
                <li>• Multiple rotating and pulsing elements</li>
                <li>• Smooth entrance and exit transitions</li>
                <li>• Vietnamese loading text</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <PageLoadingAnimation isVisible={isLoading} />
    </div>
  )
}
