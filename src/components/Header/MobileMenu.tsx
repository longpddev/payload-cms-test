'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronRight } from 'lucide-react'

interface SubMenuItem {
  title: string
  href: string
}

interface MenuItem {
  title: string
  href: string
  submenu?: SubMenuItem[]
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  menuItems: MenuItem[]
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, menuItems }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleSubmenu = (title: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(title)) {
      newExpanded.delete(title)
    } else {
      newExpanded.add(title)
    }
    setExpandedItems(newExpanded)
  }

  const sidebarVariants = {
    closed: {
      x: '-100%',
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  }

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: -20,
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const submenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: 'easeInOut' as const,
      },
    },
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut' as const,
      },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed top-0 left-0 h-full w-[min(100vw,400px)] bg-white z-50 shadow-2xl"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 py-4 pr-3 border-b border-gray-200">
              <div className="flex-shrink-0 w-[40px] h-[45px]">
                <Image
                  src="/logo.png"
                  alt="CD Light Logo"
                  className="block max-w-full max-h-full object-contain"
                  width={843}
                  height={962}
                />
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4">
              <motion.nav
                className="space-y-2"
                variants={{
                  open: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2,
                    },
                  },
                }}
                initial="closed"
                animate="open"
              >
                {menuItems.map((item) => (
                  <motion.div key={item.title} variants={menuItemVariants}>
                    <div className="border-b border-gray-100 last:border-b-0">
                      {item.submenu ? (
                        <div>
                          <button
                            onClick={() => toggleSubmenu(item.title)}
                            className="w-full flex items-center justify-between py-2 px-2 text-left text-gray-800 hover:text-primary transition-colors"
                          >
                            <span className="text-sm font-medium">{item.title}</span>
                            <motion.div
                              animate={{
                                rotate: expandedItems.has(item.title) ? 90 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronRight className="w-5 h-5" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {expandedItems.has(item.title) && (
                              <motion.div
                                variants={submenuVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                className="overflow-hidden"
                              >
                                <div className="pl-4 pb-2">
                                  {item.submenu.map((subItem) => (
                                    <Link
                                      key={subItem.title}
                                      href={subItem.href}
                                      className="block py-1.5 px-2 text-xs text-gray-600 hover:text-primary transition-colors"
                                      onClick={onClose}
                                    >
                                      {subItem.title}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="block py-2 px-2 text-sm font-medium text-gray-800 hover:text-primary transition-colors"
                          onClick={onClose}
                        >
                          {item.title}
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
