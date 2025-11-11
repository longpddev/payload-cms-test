import { cn } from '@/lib/utils'
import { FC, ReactNode } from 'react'

interface SliderItemProps {
  children: ReactNode
  className?: string
}

const SliderItem: FC<SliderItemProps> = ({ children, className = '' }) => (
  <div className={cn('relative flex-shrink-0 w-full', className)}>{children}</div>
)

export default SliderItem
