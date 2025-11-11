import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const glassButtonVariants = cva(
  "group relative overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-500 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] tracking-widest uppercase before:absolute before:inset-0 before:bg-white/5 before:transition-transform before:duration-500",
  {
    variants: {
      variant: {
        primary:
          'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 before:-translate-x-full hover:before:translate-x-0',
        outline:
          'border border-white/30 text-white hover:border-white/50 before:translate-x-full hover:before:translate-x-0',
        light:
          'bg-transparent border-2 border-gray-400 text-gray-600 font-semibold hover:border-primary hover:text-primary before:bg-primary/5 before:-translate-x-full hover:before:translate-x-0',
      },
      size: {
        default: 'px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm w-full sm:w-auto text-center',
        sm: 'px-4 sm:px-6 py-2 sm:py-3 text-xs w-full sm:w-auto text-center',
        lg: 'px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-base w-full sm:w-auto text-center',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

function GlassButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof glassButtonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return <Comp className={cn(glassButtonVariants({ variant, size, className }))} {...props}></Comp>
}

export { GlassButton, glassButtonVariants }
