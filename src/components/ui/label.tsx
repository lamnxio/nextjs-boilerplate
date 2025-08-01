'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@/libs/utils'

interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
  withAsterisk?: boolean
}

function Label({ className, withAsterisk = false, children, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
      {withAsterisk && <span className="text-destructive">*</span>}
    </LabelPrimitive.Root>
  )
}

export { Label }
