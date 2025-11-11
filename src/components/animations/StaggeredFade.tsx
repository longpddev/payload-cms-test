'use client'
import { motion, useInView } from 'motion/react'
import * as React from 'react'

const StaggeredFade = ({
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
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: index * staggerDelay,
                duration: 0.5,
                ease: 'easeOut',
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

export default StaggeredFade
