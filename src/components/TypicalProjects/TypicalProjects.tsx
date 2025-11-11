'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

const tabs = [
  { id: 'all', label: 'ALL' },
  { id: 'commercial', label: 'COMMERCIAL' },
  { id: 'office', label: 'OFFICE' },
  { id: 'public', label: 'PUBLIC' },
  { id: 'residential', label: 'RESIDENTIAL' },
]

const TypicalProjects = () => {
  const [activeTab, setActiveTab] = useState('all')

  return (
    <div className="w-full">
      <div className="relative">
        <div className="flex items-center justify-center space-x-8 md:space-x-12 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative px-4 py-3 text-sm md:text-base font-medium tracking-wider transition-colors duration-200',
                {
                  'text-primary': activeTab === tab.id,
                },
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  layoutId="activeTab"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content area for projects based on active tab */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.3 }}
        className="mt-8 p-4"
      >
        <div className="text-center">
          Content for {activeTab.toUpperCase()} projects will be displayed here
        </div>
      </motion.div>
    </div>
  )
}

export default TypicalProjects
