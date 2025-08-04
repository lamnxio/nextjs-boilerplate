import { Toaster } from "@/components/ui/sonner"

interface ToastProviderProps {
  children?: React.ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
