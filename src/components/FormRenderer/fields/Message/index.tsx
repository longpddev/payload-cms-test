import React from 'react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export const Message: React.FC<{
  message?: SerializedEditorState | string
}> = ({ message }) => {
  if (!message) return null

  // Handle both rich text and plain string messages
  if (typeof message === 'string') {
    return (
      <div className="text-sm text-gray-600 mb-4">
        <p>{message}</p>
      </div>
    )
  }

  // For rich text, you would typically use a RichText component
  // For now, we'll handle it as a simple message
  return (
    <div className="text-sm text-gray-600 mb-4">
      <div dangerouslySetInnerHTML={{ __html: message as unknown as string }} />
    </div>
  )
}
