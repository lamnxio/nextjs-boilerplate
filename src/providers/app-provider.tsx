import { NextIntlProvider } from "./next-intl-provider"
import { QueryProvider } from "./query-provider"
import ThemeProvider from "./theme-provider"
import { ToastProvider } from "./toaster-provider"

interface AppProviderProps {
  children: React.ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider>
      <NextIntlProvider>
        <QueryProvider>
          <ToastProvider>{children}</ToastProvider>
        </QueryProvider>
      </NextIntlProvider>
    </ThemeProvider>
  )
}
