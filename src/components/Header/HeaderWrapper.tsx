import { getPayload } from 'payload'
import config from '@payload-config'
import type { Header as HeaderType } from '@/payload-types'
import Header from './Header'

const getHeaderData = async (): Promise<HeaderType | null> => {
  try {
    const payload = await getPayload({ config })
    const headerData = await payload.findGlobal({
      slug: 'header',
      depth: 2,
    })

    return headerData
  } catch (error) {
    console.error('Error fetching header data:', error)
    return null
  }
}

export default async function HeaderWrapper() {
  const headerData = await getHeaderData()
  return <Header headerData={headerData} />
}
