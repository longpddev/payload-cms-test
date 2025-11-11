'use client'

import { cn } from '@/lib/utils'
import { motion, useInView } from 'motion/react'
import * as React from 'react'

type OmitProps =
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onDragTransitionEnd'
  | 'onDragTransitionStart'
  | 'onDragTransitionUpdate'
  | 'onDragTransitionCancel'
  | 'onAnimationEnd'
  | 'onAnimationStart'

const FADE_VARIANT = (direction: 'up' | 'down') => ({
  show: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: direction === 'down' ? -18 : 18 },
})

const HeadingAnimation = (
  props: Omit<React.ComponentProps<'h2'>, 'children' | OmitProps> & { children: string },
) => {
  const ref = React.useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, { once: true })
  const splittedText = props.children.split('')

  return (
    <motion.h2
      {...props}
      ref={ref}
      initial="hidden"
      animate={isInView ? 'show' : ''}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.01,
          },
        },
      }}
      className={cn('text-2xl font-bold', props.className)}
    >
      {splittedText.map((letter, index) => (
        <motion.span key={index} variants={FADE_VARIANT('up')} style={{ display: 'inline-block' }}>
          {letter === ' ' ? <span>&nbsp;</span> : letter}
        </motion.span>
      ))}
    </motion.h2>
  )
}

export default HeadingAnimation
