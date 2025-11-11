import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { PriceQuote } from '@/payload-types'
import PriceQuoteClient from './PriceQuoteClient'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

const PriceQuotePage = async ({ params }: PageProps) => {
  const { slug } = await params
  const payload = await getPayload({ config })

  const priceQuotesData = await payload.find({
    collection: 'priceQuotes',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (!priceQuotesData.docs.length) {
    notFound()
  }

  const priceQuote = priceQuotesData.docs[0] as PriceQuote

  return <PriceQuoteClient priceQuote={priceQuote} />
}

export default PriceQuotePage
