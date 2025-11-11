import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getServerSideURL } from '@/utilities/get-url'

// Vietnamese SEO defaults
export const DEFAULT_SEO = {
  title: 'CD LIGHT - Uy tín tạo nên thương hiệu',
  description:
    'CD LIGHT - Công ty cổ phần thương mại và dịch vụ CD chuyên cung cấp các sản phẩm chiếu sáng chất lượng cao. Uy tín tạo nên thương hiệu.',
  keywords:
    'CD LIGHT, công ty cổ phần thương mại, dịch vụ CD, chiếu sáng, đèn LED, thiết bị chiếu sáng',
  siteName: 'Công ty cổ phần thương mại và dịch vụ CD',
  domain: getServerSideURL(),
  defaultImage: '/og-image.jpg',
  locale: 'vi_VN' as const,
}

// Generate Vietnamese metadata for collections
export async function generateVietnameseMetadata(
  collection: string,
  slug: string,
  fallbackTitle?: string,
  fallbackDescription?: string,
): Promise<Metadata> {
  try {
    const payload = await getPayload({ config })

    // Fetch the document with SEO data
    const result = await payload.find({
      collection: collection as any,
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 1,
      limit: 1,
    })

    const doc = result.docs[0]

    if (!doc) {
      return generateFallbackMetadata(fallbackTitle, fallbackDescription)
    }

    // Extract SEO data from Payload SEO plugin
    const seoData = (doc as any).meta || {}
    const title =
      seoData.title || (doc as any).title || (doc as any).name || fallbackTitle || DEFAULT_SEO.title
    const description =
      seoData.description ||
      (doc as any).shortDescription ||
      (doc as any).excerpt ||
      fallbackDescription ||
      DEFAULT_SEO.description
    const image = seoData.image?.url || DEFAULT_SEO.defaultImage
    const url = `${DEFAULT_SEO.domain}/${collection}/${slug}`

    return {
      title,
      description,
      keywords: DEFAULT_SEO.keywords,
      authors: [{ name: 'CD LIGHT' }],
      creator: 'CD LIGHT',
      publisher: DEFAULT_SEO.siteName,
      alternates: {
        canonical: url,
        languages: {
          'vi-VN': url,
        },
      },
      openGraph: {
        type: 'website',
        locale: DEFAULT_SEO.locale,
        url,
        title,
        description,
        siteName: DEFAULT_SEO.siteName,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        creator: '@cdlight',
        images: [image],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return generateFallbackMetadata(fallbackTitle, fallbackDescription)
  }
}

// Generate Vietnamese metadata for pages
export async function generatePageMetadata(
  slug: string,
  fallbackTitle?: string,
  fallbackDescription?: string,
): Promise<Metadata> {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 1,
      limit: 1,
    })

    const page = result.docs[0]

    if (!page) {
      return generateFallbackMetadata(fallbackTitle, fallbackDescription)
    }

    const seoData = (page as any).meta || {}
    const title = seoData.title || (page as any).title || fallbackTitle || DEFAULT_SEO.title
    const description =
      seoData.description || (page as any).excerpt || fallbackDescription || DEFAULT_SEO.description
    const image = seoData.image?.url || DEFAULT_SEO.defaultImage
    const url = slug === 'home' ? DEFAULT_SEO.domain : `${DEFAULT_SEO.domain}/${slug}`

    return {
      title,
      description,
      keywords: DEFAULT_SEO.keywords,
      authors: [{ name: 'CD LIGHT' }],
      creator: 'CD LIGHT',
      publisher: DEFAULT_SEO.siteName,
      alternates: {
        canonical: url,
        languages: {
          'vi-VN': url,
        },
      },
      openGraph: {
        type: 'website',
        locale: DEFAULT_SEO.locale,
        url,
        title,
        description,
        siteName: DEFAULT_SEO.siteName,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        creator: '@cdlight',
        images: [image],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    }
  } catch (error) {
    console.error('Error generating page metadata:', error)
    return generateFallbackMetadata(fallbackTitle, fallbackDescription)
  }
}

// Generate homepage metadata from globals
export async function generateHomepageMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config })

    const homepage = await payload.findGlobal({
      slug: 'homepage',
      depth: 1,
    })

    const seoData = (homepage as any).meta || {}
    const title = seoData.title || DEFAULT_SEO.title
    const description = seoData.description || DEFAULT_SEO.description
    const image = seoData.image?.url || DEFAULT_SEO.defaultImage

    return {
      title,
      description,
      keywords: DEFAULT_SEO.keywords,
      authors: [{ name: 'CD LIGHT' }],
      creator: 'CD LIGHT',
      publisher: DEFAULT_SEO.siteName,
      alternates: {
        canonical: DEFAULT_SEO.domain,
        languages: {
          'vi-VN': DEFAULT_SEO.domain,
        },
      },
      openGraph: {
        type: 'website',
        locale: DEFAULT_SEO.locale,
        url: DEFAULT_SEO.domain,
        title,
        description,
        siteName: DEFAULT_SEO.siteName,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        creator: '@cdlight',
        images: [image],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    }
  } catch (error) {
    console.error('Error generating homepage metadata:', error)
    return generateFallbackMetadata()
  }
}

// Fallback metadata
export function generateFallbackMetadata(title?: string, description?: string): Metadata {
  const fallbackTitle = title || DEFAULT_SEO.title
  const fallbackDescription = description || DEFAULT_SEO.description

  return {
    title: fallbackTitle,
    description: fallbackDescription,
    keywords: DEFAULT_SEO.keywords,
    authors: [{ name: 'CD LIGHT' }],
    creator: 'CD LIGHT',
    publisher: DEFAULT_SEO.siteName,
    alternates: {
      canonical: DEFAULT_SEO.domain,
      languages: {
        'vi-VN': DEFAULT_SEO.domain,
      },
    },
    openGraph: {
      type: 'website',
      locale: DEFAULT_SEO.locale,
      url: DEFAULT_SEO.domain,
      title: fallbackTitle,
      description: fallbackDescription,
      siteName: DEFAULT_SEO.siteName,
      images: [
        {
          url: DEFAULT_SEO.defaultImage,
          width: 1200,
          height: 630,
          alt: fallbackTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fallbackTitle,
      description: fallbackDescription,
      creator: '@cdlight',
      images: [DEFAULT_SEO.defaultImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
