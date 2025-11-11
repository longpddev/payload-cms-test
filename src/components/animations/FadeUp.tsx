'use client'
import { motion, useInView } from 'motion/react'
import * as React from 'react'

const FadeUp = ({
  children,
  className = '',
  duration = 0.6,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  duration?: number
  delay?: number
}) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
            }
          : { opacity: 0, y: 30 }
      }
      transition={{
        duration: duration,
        delay: delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}

export default FadeUp
