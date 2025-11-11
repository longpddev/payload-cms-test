import React from 'react'
import PartnerSection from '@/components/PartnerSection'
import type { PartnersBlock as PartnersBlockType } from '@/payload-types'

export const PartnersBlockComponent: React.FC<PartnersBlockType> = ({ partners }) => {
  if (!partners?.length) return null

  const partnerData = partners.map((partner, index) => ({
    id: String(index + 1),
    name: partner.name,
    logo: typeof partner.logo === 'object' ? partner.logo.url || '' : '',
  }))

  return <PartnerSection partners={partnerData} />
}
