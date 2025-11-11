'use client'
import { motion, useInView } from 'motion/react'
import * as React from 'react'

const TypingEffect = ({
  text,
  className = '',
  speed = 0.05,
  cursorBlinkSpeed = 0.8,
}: {
  text: string
  className?: string
  speed?: number
  cursorBlinkSpeed?: number
}) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className={`flex items-center ${className}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.span
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.1,
            },
          },
        }}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delay: index * speed,
                  duration: 0.1,
                },
              },
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
      <motion.span
        className="ml-1 h-5 w-0.5 bg-current"
        animate={{
          opacity: [1, 0, 1],
        }}
        transition={{
          duration: cursorBlinkSpeed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  )
}

export default TypingEffect
