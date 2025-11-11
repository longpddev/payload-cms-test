'use client'

import Link from 'next/link'
import { useState } from 'react'

export function HoverPrefetchLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const [active, setActive] = useState<Record<string, boolean>>({})

  return (
    <Link
      data-prefetch={active[href]}
      href={href}
      prefetch={!!active[href]}
      onMouseEnter={() => setActive({ ...active, [href]: true })}
      className={className}
    >
      {children}
    </Link>
  )
}
