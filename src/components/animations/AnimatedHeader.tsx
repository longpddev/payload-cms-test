'use client'

import React from 'react'
import { motion } from 'motion/react'

interface AnimatedHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export function AnimatedPageHeader({ title, subtitle, className = '' }: AnimatedHeaderProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-quicksand"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          className="text-lg text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

interface AnimatedBannerTextProps {
  title: string
  subtitle?: string
}

export function AnimatedBannerText({ title, subtitle }: AnimatedBannerTextProps) {
  return (
    <div className="text-center text-white">
      <motion.h1
        className="text-3xl md:text-5xl font-bold mb-4 font-quicksand"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

interface AnimatedSectionProps {
  title: string
  subtitle?: string
  delay?: number
}

export function AnimatedSection({ title, subtitle, delay = 0.4 }: AnimatedSectionProps) {
  return (
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <h2 className="mb-2">{title}</h2>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
    </motion.div>
  )
}

interface AnimatedEmptyStateProps {
  title: string
  subtitle?: string
  delay?: number
}

export function AnimatedEmptyState({ title, subtitle, delay = 0.4 }: AnimatedEmptyStateProps) {
  return (
    <motion.div
      className="text-center py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <h2 className="mb-4">{title}</h2>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
    </motion.div>
  )
}
