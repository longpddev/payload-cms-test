type SupportedUnit = 'piece' | 'meter' | string | undefined | null

export function formatPrice(value?: number | null, unit?: SupportedUnit) {
  if (typeof value !== 'number') return ''

  const formatted = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value)

  if (unit === 'meter') {
    return `${formatted}/m`
  }

  return formatted
}
