'use client'
import { motion, useInView } from 'motion/react'
import * as React from 'react'

const TextFade = ({
  direction = 'up',
  children,
  deep = 36,
  className = '',
  staggerChildren = 0.15,
}: {
  direction?: 'up' | 'down'
  children: React.ReactNode
  className?: string
  deep?: number
  staggerChildren?: number
}) => {
  const FADE_DOWN = {
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hidden: { opacity: 0, y: direction === 'down' ? -deep : deep },
  }
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'show' : ''}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerChildren,
          },
        },
      }}
      className={className}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? <motion.div variants={FADE_DOWN}>{child}</motion.div> : child,
      )}
    </motion.div>
  )
}

export default TextFade
