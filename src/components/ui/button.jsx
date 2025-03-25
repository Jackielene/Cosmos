import React from 'react'
import { cn } from '@/lib/utils'

export const Button = ({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        // Add your button styling classes here
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}