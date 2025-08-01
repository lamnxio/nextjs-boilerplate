import { NextIntlClientProvider } from 'next-intl'

interface NextIntlProviderProps {
  children: React.ReactNode
}

export function NextIntlProvider({ children }: NextIntlProviderProps) {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>
}
