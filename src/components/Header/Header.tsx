'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { Menu } from 'lucide-react'

import { cn } from '@/lib/utils'
import MobileMenu from './MobileMenu'
import NavLink from '../NavLink/NavLink'
import type { Category, Header as HeaderType } from '@/payload-types'

interface SubMenuItem {
  title: string
  href: string
}

interface MenuItem {
  title: string
  href: string
  submenu?: SubMenuItem[]
}

interface MenuItemProps {
  item: MenuItem
}

interface HeaderProps {
  headerData?: HeaderType | null
}

// Helper function to build href from global data
function buildHref(
  item:
    | HeaderType['navigation']['items'][0]
    | {
        linkType: 'category' | 'custom'
        categoryReference?: (number | null) | Category
        customTitle?: string | null
        customLinkType?: ('internal' | 'external') | null
        internalLink?: string | null
        externalLink?: string | null
        id?: string | null
      },
): string {
  if (
    item.linkType === 'category' &&
    item.categoryReference &&
    typeof item.categoryReference === 'object'
  ) {
    return `/danh-muc/${item.categoryReference.slug}`
  }

  if (item.linkType === 'custom') {
    if (item.customLinkType === 'external' && item.externalLink) {
      return item.externalLink
    }
    if (item.customLinkType === 'internal' && item.internalLink) {
      return item.internalLink
    }
  }

  return '#'
}

// Helper function to convert global data to MenuItem format
function convertToMenuItem(navItem: HeaderType['navigation']['items'][0]): MenuItem {
  const href = navItem.linkType === 'dropdown' ? '#' : buildHref(navItem)

  // Get title based on linkType
  let title = navItem.title
  if (
    navItem.linkType === 'category' &&
    navItem.categoryReference &&
    typeof navItem.categoryReference === 'object'
  ) {
    title = navItem.categoryReference.name || navItem.title
  } else if (navItem.linkType === 'custom' && navItem.customTitle) {
    title = navItem.customTitle
  }

  const submenu = navItem.dropdownItems?.map((dropdownItem) => {
    let dropdownTitle = dropdownItem.customTitle || ''
    if (
      dropdownItem.linkType === 'category' &&
      dropdownItem.categoryReference &&
      typeof dropdownItem.categoryReference === 'object'
    ) {
      dropdownTitle = dropdownItem.categoryReference.name || ''
    }

    return {
      title: dropdownTitle,
      href: buildHref(dropdownItem),
    }
  })

  return {
    title,
    href,
    submenu: submenu?.length ? submenu : undefined,
  }
}

const Submenu = ({ items }: { items: SubMenuItem[] }) => {
  const submenuRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   const submenuElement = submenuRef.current
  //   if (!submenuElement) return

  //   const observer = new ResizeObserver(
  //     throttle(() => {
  //       const rect = submenuElement.getBoundingClientRect()
  //       const windowWidth = window.innerWidth

  //       // Check if submenu overflows the right edge of the screen
  //       if (rect.right > windowWidth) {
  //         // Calculate how much to shift left to keep submenu within viewport
  //         const overflow = rect.right - windowWidth + 16 // 16px buffer
  //         submenuElement.style.left = `-${overflow}px`
  //       } else {
  //         submenuElement.style.left = '0px'
  //       }
  //     }, 100),
  //   )

  //   observer.observe(submenuElement)

  //   return () => {
  //     observer.disconnect()
  //   }
  // }, [])

  return (
    <motion.div
      ref={submenuRef}
      className="absolute top-full left-1/2 -translate-x-1/2 min-w-48 bg-white shadow-lg z-50"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="py-4 px-8">
        {items.map((subItem) => (
          <div key={subItem.title} className="block py-1.5">
            <NavLink
              href={subItem.href}
              className="text-sm text-gray-700 hover-underline hover:text-primary relative whitespace-nowrap"
              activeClassName="underline-animation underline-animation-active text-primary"
            >
              {subItem.title}
            </NavLink>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <div
      className="relative h-full flex items-center py-2 px-4"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <NavLink
        href={item.submenu ? '#' : item.href}
        className={cn(
          'relative pb-1 text-[15px] text-gray-800 transition-colors hover:text-primary underline-animation',
          {
            'underline-animation-active': isHover,
          },
        )}
        activeClassName="underline-animation underline-animation-active text-primary"
      >
        {item.title}
      </NavLink>
      {item.submenu && (
        <AnimatePresence>{isHover && <Submenu items={item.submenu} />}</AnimatePresence>
      )}
    </div>
  )
}

const Header: React.FC<HeaderProps> = ({ headerData }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Convert global data to menu items or use fallback
  const menuItems: MenuItem[] = headerData?.navigation?.items
    ? headerData.navigation.items.map(convertToMenuItem)
    : []

  // Logo data with fallback
  const logoData = headerData?.logo || {
    image: null,
    alt: 'CD Light Logo',
    width: 60,
    height: 65,
  }

  const logoImageUrl =
    typeof logoData.image === 'object' && logoData.image?.url ? logoData.image.url : '/logo.png'

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-300 h-[var(--header-height)]',
          {
            'shadow-[0_0_30px_0_rgb(0_0_0_/_20%)]': isScrolled,
            'bg-white': true,
            'border-b border-stone-100': !isScrolled,
            // 'bg-transparent': !isScrolled,
            // 'shadow-[0_0_30px_0_rgb(0_0_0_/_20%)]': isScrolled,
            // 'bg-white': isScrolled,
          },
        )}
      >
        <div className="app-container">
          <div className="flex items-center justify-between h-20">
            <div
              className="flex-shrink-0"
              style={{
                width: `${logoData.width || 60}px`,
                height: `${logoData.height || 65}px`,
              }}
            >
              <Link href="/">
                <Image
                  src={logoImageUrl}
                  alt={logoData.alt || 'CD Light Logo'}
                  className="block max-w-full max-h-full object-contain"
                  width={logoData.width || 60}
                  height={logoData.height || 65}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav
              className={cn('hidden md:flex items-center', {
                'h-full': true,
              })}
            >
              {menuItems.map((item) => (
                <MenuItem key={item.title} item={item} />
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuItems={menuItems}
      />
    </>
  )
}

export default Header
