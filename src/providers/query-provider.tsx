'use client'

import { queryClient } from '@/configs/react-query'
import { QueryClientProvider } from '@tanstack/react-query'

interface QueryProviderProps {
  children?: React.ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
