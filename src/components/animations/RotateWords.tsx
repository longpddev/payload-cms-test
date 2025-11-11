'use client'
import { motion, AnimatePresence } from 'motion/react'
import * as React from 'react'

const RotateWords = ({
  words,
  className = '',
  interval = 2000,
}: {
  words: string[]
  className?: string
  interval?: number
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, interval)

    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, rotateX: -90 }}
          animate={{ opacity: 1, rotateX: 0 }}
          exit={{ opacity: 0, rotateX: 90 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
          className="inline-block"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export default RotateWords
