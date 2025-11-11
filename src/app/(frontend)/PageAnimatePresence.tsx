'use client'

import React from 'react'
import { AnimatePresence } from 'motion/react'

const PageAnimatePresence = ({ children }: { children: React.ReactNode }) => {
  return <AnimatePresence>{children}</AnimatePresence>
}

export default PageAnimatePresence
