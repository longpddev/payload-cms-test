import React from 'react'
import type { FanpageBlock as FanpageBlockType } from '@/payload-types'

export const FanpageBlockComponent: React.FC<FanpageBlockType> = ({
  title = 'Fanpage',
  facebookPageUrl = 'https://www.facebook.com/cdlightthietbidenchieusang',
  width = 340,
  height = 200,
  showTimeline = true,
  showFacepile = true,
  hideHeader = false,
  hideCover = false,
}) => {
  // Build the Facebook plugin URL with parameters
  const buildFacebookPluginUrl = () => {
    const baseUrl = 'https://www.facebook.com/plugins/page.php'
    const params = new URLSearchParams({
      href: facebookPageUrl,
      tabs: showTimeline ? 'timeline' : '',
      width: (width || 340).toString(),
      height: (height || 200).toString(),
      small_header: (hideHeader || false).toString(),
      adapt_container_width: 'true',
      hide_cover: (hideCover || false).toString(),
      show_facepile: (showFacepile || true).toString(),
      appId: '', // Empty appId as in original
    })

    return `${baseUrl}?${params.toString()}`
  }

  return (
    <div className="lg:col-span-1">
      <p className="uppercase tracking-wider text-lg text-gray-200 font-semibold">{title}</p>
      <div className="mt-6">
        <iframe
          src={buildFacebookPluginUrl()}
          width="100%"
          height={height || 200}
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title={`Facebook Page - ${title}`}
        />
      </div>
    </div>
  )
}
