'use client'
import { motion, useInView } from 'motion/react'
import * as React from 'react'

const GradualSpacing = ({
  text,
  className = '',
  staggerDelay = 0.05,
}: {
  text: string
  className?: string
  staggerDelay?: number
}) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className={`flex ${className}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                delay: index * staggerDelay,
                duration: 0.5,
                ease: 'easeOut',
              },
            },
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}

export default GradualSpacing
