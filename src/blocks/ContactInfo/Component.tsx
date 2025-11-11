import React from 'react'
import type { ContactInfoBlock as ContactInfoBlockType } from '@/payload-types'
import { Phone, MapPin, Mail } from 'lucide-react'

export const ContactInfoBlockComponent: React.FC<ContactInfoBlockType> = ({ items }) => {
  if (!items?.length) return null

  return (
    <div className="lg:col-span-1">
      <p className="uppercase tracking-wider text-lg text-gray-200 font-semibold">Địa chỉ</p>
      <ul className="mt-6 space-y-4 text-sm">
        {items.map((item, index) => {
          const isAddress = item.type === 'address'
          return (
            <li key={index} className={`flex ${isAddress ? 'items-start' : 'items-center'}`}>
              {item.type === 'phone' && (
                <Phone className={`mr-3 h-5 w-5 flex-shrink-0 text-gray-500`} />
              )}
              {item.type === 'address' && (
                <MapPin className={`mr-3 h-5 w-5 flex-shrink-0 text-gray-500 mt-1`} />
              )}
              {item.type === 'email' && (
                <Mail className={`mr-3 h-5 w-5 flex-shrink-0 text-gray-500`} />
              )}
              <span className="text-gray-50">
                {item.type === 'phone' && (
                  <a href={`tel:${item.value}`} className="hover:text-primary">
                    {item.value}
                  </a>
                )}
                {item.type === 'email' && (
                  <a href={`mailto:${item.value}`} className="hover:text-primary">
                    {item.value}
                  </a>
                )}
                {item.type === 'address' && <span>{item.value}</span>}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
