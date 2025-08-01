import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['en', 'vi'],
  defaultLocale: 'en',
})

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  return {
    locale,
    messages: {
      ...(await import(`../locales/${locale}/common.json`)).default,
      ...(await import(`../locales/${locale}/home-page.json`)).default,
      ...(await import(`../locales/${locale}/pet-module.json`)).default,
    },
  }
})
