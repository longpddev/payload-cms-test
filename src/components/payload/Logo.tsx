'use client'

import React from 'react'
import Image from 'next/image'

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/logo.png"
        alt="CD Light"
        width={200}
        height={200}
        priority
        style={{ width: '150px', height: 'auto' }}
      />
    </div>
  )
}

export default Logo
