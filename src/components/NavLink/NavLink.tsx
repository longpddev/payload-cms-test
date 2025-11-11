import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { HoverPrefetchLink } from '../HoverPrefetchLink'

const NavLink = ({
  href,
  children,
  className,
  activeClassName,
}: {
  href: string
  children: React.ReactNode
  className?: string
  activeClassName?: string
}) => {
  const pathname = usePathname()
  return (
    <HoverPrefetchLink
      href={href}
      className={cn(
        className,
        pathname === href || (pathname.startsWith(href) && href !== '/') ? activeClassName : '',
      )}
    >
      {children}
    </HoverPrefetchLink>
  )
}

export default NavLink
