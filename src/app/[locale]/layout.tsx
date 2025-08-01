import { AppHeader } from '@/components/layout/app-header'
import { routing } from '@/configs/next-intl'
import AppProvider from '@/providers/app-provider'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export async function generateMetadata(props: LayoutProps): Promise<Metadata> {
  const { locale } = await props.params

  const t = await getTranslations({
    locale,
    namespace: 'RootLayout',
  })

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProvider>
          <div className="container mx-auto px-4 py-8">
            <AppHeader />
            <main>{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  )
}
