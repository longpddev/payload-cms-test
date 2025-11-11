'use client'
import { motion, useInView } from 'motion/react'
import * as React from 'react'

const BlurIn = ({
  text,
  className = '',
  duration = 0.8,
}: {
  text: string
  className?: string
  duration?: number
}) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={
        isInView
          ? {
              opacity: 1,
              filter: 'blur(0px)',
            }
          : { opacity: 0, filter: 'blur(10px)' }
      }
      transition={{
        duration: duration,
        ease: 'easeOut',
      }}
    >
      {text}
    </motion.div>
  )
}

export default BlurIn
