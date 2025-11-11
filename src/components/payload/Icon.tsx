'use client'

import React from 'react'
import Image from 'next/image'

const Icon: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/logo.png"
        alt="CD Light Icon"
        width={100}
        height={32}
        className="h-8 w-auto"
        style={{ maxHeight: '32px', height: 'auto' }}
      />
    </div>
  )
}

export default Icon
