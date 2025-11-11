import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Homepage as HomePageType } from '@/payload-types'
import { generateHomepageMetadata } from '@/lib/seo'
import { RenderBlocks } from '@/utilities/renderBlocks'

async function getHomePageData(): Promise<HomePageType | null> {
  try {
    const payload = await getPayload({ config })
    const homePage = await payload.findGlobal({
      slug: 'homepage',
      depth: 2,
    })
    return homePage
  } catch (error) {
    console.error('Error fetching home page data:', error)
    return null
  }
}

async function HomePageContent() {
  const homePageData = await getHomePageData()

  return (
    <main className="pt-[var(--header-height)]">
      {homePageData?.layout && <RenderBlocks blocks={homePageData.layout} />}
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return generateHomepageMetadata()
}

export default function Home() {
  return <HomePageContent />
}
