'use client'
import { motion, useInView } from 'motion/react'
import * as React from 'react'

const WordsPullUp = ({
  text,
  className = '',
  staggerDelay = 0.1,
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
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {text.split(' ').map((word, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: index * staggerDelay,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            },
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

export default WordsPullUp
