'use client'

import { motion } from 'motion/react'
import { useState, useEffect } from 'react'

interface ProgressBarProps {
  isActive?: boolean
}

export default function ProgressBar({ isActive = true }: ProgressBarProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) return 98

        if (prev < 90) {
          // Fast progress in the beginning
          return prev + Math.random() * 8 + 2
        } else {
          // Slow down after 90%
          return prev + Math.random() * 0.5 + 0.1
        }
      })
    }, 500)

    return () => clearInterval(interval)
  }, [isActive])

  return (
    <div className="w-full mx-auto">
      {/* Progress bar container */}
      <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
        {/* Progress fill */}
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />

        {/* Shimmer effect */}
        <motion.div
          className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: progress < 98 ? [-80, 320] : 240,
          }}
          transition={{
            duration: progress < 98 ? 2 : 0,
            repeat: progress < 98 ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  )
}
