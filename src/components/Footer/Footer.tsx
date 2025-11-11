import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { Facebook } from 'lucide-react'
import React, { ComponentProps } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { RenderFooterBlocks } from '@/utilities/renderFooterBlocks'
import TiktokSvg from '@/assets/tiktok-svg'

const FooterText = ({
  children,
  asChild,
  className,
  ...props
}: ComponentProps<'span'> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'span'
  return (
    <Comp className={cn('text-gray-50', className)} {...props}>
      {children}
    </Comp>
  )
}

const getFooterData = async () => {
  const payload = await getPayload({ config })
  const footerData = await payload.findGlobal({
    slug: 'footer',
    depth: 2,
  })
  return footerData
}

const Footer = async () => {
  const footerData = await getFooterData()

  const totalSections = footerData.layout?.length || 0

  if (!totalSections) return null

  const gridColsClass =
    totalSections <= 2
      ? 'lg:grid-cols-2'
      : totalSections === 3
        ? 'lg:grid-cols-3'
        : totalSections === 4
          ? 'lg:grid-cols-4'
          : 'lg:grid-cols-5'
  return (
    <footer className="border-t bg-[hsl(200.65deg_95%_5%)] text-gray-200">
      <div className="py-12 app-container">
        <div className={`grid grid-cols-1 gap-12 md:grid-cols-2 ${gridColsClass}`}>
          <RenderFooterBlocks blocks={footerData.layout} />
        </div>

        <div className="mt-12 border-t border-sky-900 pt-8 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <p className="text-sm text-gray-50">
              &copy; {new Date().getFullYear()} CD LIGHT. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 sm:mt-0">
              <FooterText asChild>
                <a
                  href="https://www.facebook.com/cdlightthietbidenchieusang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-6 w-6" />
                </a>
              </FooterText>
              <FooterText asChild>
                <a
                  href="https://www.tiktok.com/@cdlight.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  <span className="sr-only">TikTok</span>
                  <TiktokSvg className="h-6 w-6" />
                </a>
              </FooterText>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
