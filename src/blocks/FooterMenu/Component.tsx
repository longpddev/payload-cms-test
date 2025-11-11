import React from 'react'
import Link from 'next/link'
import type { FooterMenuBlock as FooterMenuBlockType } from '@/payload-types'

export const FooterMenuBlockComponent: React.FC<FooterMenuBlockType> = ({ sections }) => {
  if (!sections?.length) return null

  const getLinkProps = (link: any) => {
    if (link.linkType === 'category' && link.categoryReference) {
      const category = typeof link.categoryReference === 'object' ? link.categoryReference : null
      return {
        href: `/danh-muc/${category?.slug || ''}`,
        title: category?.name || '',
      }
    }

    if (link.linkType === 'custom') {
      if (link.customLinkType === 'external') {
        return {
          href: link.externalLink || '#',
          title: link.customTitle || '',
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      } else {
        return {
          href: link.internalLink || '#',
          title: link.customTitle || '',
        }
      }
    }

    return { href: '#', title: '' }
  }

  return (
    <>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="lg:col-span-1">
          <p className="uppercase tracking-wider text-lg text-gray-200 font-semibold">
            {section.title}
          </p>
          {section.links && section.links.length > 0 && (
            <ul className="mt-6 space-y-3 text-sm">
              {section.links.map((link, linkIndex) => {
                const linkProps = getLinkProps(link)
                if (!linkProps.title) return null

                return (
                  <li key={linkIndex}>
                    <span className="text-gray-50">
                      <Link
                        href={linkProps.href}
                        className="hover:text-primary"
                        {...(linkProps.target && { target: linkProps.target })}
                        {...(linkProps.rel && { rel: linkProps.rel })}
                      >
                        {linkProps.title}
                      </Link>
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      ))}
    </>
  )
}
