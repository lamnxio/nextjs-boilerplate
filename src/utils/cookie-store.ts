/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Utility functions for Cookie Store API operations
 * Provides type-safe cookie operations with error handling
 */

import { COOKIE_KEY } from '@/constants/cookie-key'

// Type for valid cookie keys
type CookieKey = (typeof COOKIE_KEY)[keyof typeof COOKIE_KEY]

// Cookie options interface
interface CookieOptions {
  expires?: Date | number
  maxAge?: number
  domain?: string
  path?: string
  secure?: boolean
  httpOnly?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
}

interface CookieStoreSetOptions {
  name: string
  value: string
  expires?: Date | number
  domain?: string
  path?: string
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
}

interface CookieStoreDeleteOptions {
  name: string
  domain?: string
  path?: string
}

interface CookieStore {
  get(name: string): Promise<{ name: string; value: string } | null>
  getAll(): Promise<{ name: string; value: string }[]>
  set(options: CookieStoreSetOptions): Promise<void>
  delete(options: CookieStoreDeleteOptions): Promise<void>
  addEventListener(type: string, listener: (event: any) => void): void
  removeEventListener(type: string, listener: (event: any) => void): void
}

declare global {
  interface Window {
    cookieStore?: CookieStore
  }
}

/**
 * Check if Cookie Store API is available
 * Falls back to document.cookie for older browsers
 */
export const isCookieStoreAvailable = (): boolean => {
  try {
    return typeof window !== 'undefined' && 'cookieStore' in window
  } catch {
    return false
  }
}

/**
 * Check if cookies are available at all
 */
export const isCookieAvailable = (): boolean => {
  try {
    return typeof window !== 'undefined' && ('cookieStore' in window || 'document' in window)
  } catch {
    return false
  }
}

/**
 * Set a cookie using Cookie Store API or fallback to document.cookie
 * @param key - The cookie key (must be from COOKIE_KEY)
 * @param value - The value to store
 * @param options - Cookie options
 * @returns Promise<boolean> indicating success
 */
export const setCookie = async <T>(key: CookieKey, value: T, options: CookieOptions = {}): Promise<boolean> => {
  if (!isCookieAvailable()) {
    console.warn('Cookies are not available')
    return false
  }

  try {
    const serializedValue = typeof value === 'string' ? value : JSON.stringify(value)

    if (isCookieStoreAvailable() && window.cookieStore) {
      // Use Cookie Store API
      await window.cookieStore.set({
        name: key,
        value: serializedValue,
        expires: options.expires,
        domain: options.domain,
        path: options.path || '/',
        secure: options.secure,
        sameSite: options.sameSite || 'lax',
      })
    } else {
      // Fallback to document.cookie
      let cookieString = `${key}=${encodeURIComponent(serializedValue)}`

      if (options.expires) {
        const expires = options.expires instanceof Date ? options.expires : new Date(Date.now() + options.expires)
        cookieString += `; expires=${expires.toUTCString()}`
      }

      if (options.maxAge) {
        cookieString += `; max-age=${options.maxAge}`
      }

      if (options.domain) {
        cookieString += `; domain=${options.domain}`
      }

      if (options.path) {
        cookieString += `; path=${options.path}`
      } else {
        cookieString += `; path=/`
      }

      if (options.secure) {
        cookieString += `; secure`
      }

      if (options.httpOnly) {
        cookieString += `; httponly`
      }

      if (options.sameSite) {
        cookieString += `; samesite=${options.sameSite}`
      }

      document.cookie = cookieString
    }

    return true
  } catch (error) {
    console.error('Error setting cookie:', error)
    return false
  }
}

/**
 * Get a cookie using Cookie Store API or fallback to document.cookie
 * @param key - The cookie key (must be from COOKIE_KEY)
 * @param defaultValue - Default value if cookie doesn't exist
 * @returns Promise<T | undefined> The parsed value or default value
 */
export const getCookie = async <T>(key: CookieKey, defaultValue?: T): Promise<T | undefined> => {
  if (!isCookieAvailable()) {
    console.warn('Cookies are not available')
    return defaultValue
  }

  try {
    let cookieValue: string | null = null

    if (isCookieStoreAvailable() && window.cookieStore) {
      // Use Cookie Store API
      const cookie = await window.cookieStore.get(key)
      cookieValue = cookie?.value || null
    } else {
      // Fallback to document.cookie
      const cookies = document.cookie.split(';')
      const cookie = cookies.find((c) => c.trim().startsWith(`${key}=`))
      cookieValue = cookie ? decodeURIComponent(cookie.split('=')[1]) : null
    }

    if (cookieValue === null) {
      return defaultValue
    }

    // Try to parse as JSON, fallback to string
    try {
      return JSON.parse(cookieValue) as T
    } catch {
      return cookieValue as T
    }
  } catch (error) {
    console.error('Error getting cookie:', error)
    return defaultValue
  }
}

/**
 * Remove a cookie using Cookie Store API or fallback to document.cookie
 * @param key - The cookie key (must be from COOKIE_KEY)
 * @param options - Cookie options (domain, path)
 * @returns Promise<boolean> indicating success
 */
export const removeCookie = async (key: CookieKey, options: Pick<CookieOptions, 'domain' | 'path'> = {}): Promise<boolean> => {
  if (!isCookieAvailable()) {
    console.warn('Cookies are not available')
    return false
  }

  try {
    if (isCookieStoreAvailable() && window.cookieStore) {
      // Use Cookie Store API
      await window.cookieStore.delete({
        name: key,
        domain: options.domain,
        path: options.path || '/',
      })
    } else {
      // Fallback to document.cookie
      let cookieString = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`

      if (options.domain) {
        cookieString += `; domain=${options.domain}`
      }

      if (options.path) {
        cookieString += `; path=${options.path}`
      } else {
        cookieString += `; path=/`
      }

      document.cookie = cookieString
    }

    return true
  } catch (error) {
    console.error('Error removing cookie:', error)
    return false
  }
}

/**
 * Check if a cookie exists
 * @param key - The cookie key (must be from COOKIE_KEY)
 * @returns Promise<boolean> indicating if cookie exists
 */
export const hasCookie = async (key: CookieKey): Promise<boolean> => {
  if (!isCookieAvailable()) {
    return false
  }

  try {
    if (isCookieStoreAvailable() && window.cookieStore) {
      const cookie = await window.cookieStore.get(key)
      return cookie !== null
    } else {
      const cookies = document.cookie.split(';')
      return cookies.some((c) => c.trim().startsWith(`${key}=`))
    }
  } catch (error) {
    console.error('Error checking cookie:', error)
    return false
  }
}

/**
 * Get all cookies using Cookie Store API or fallback to document.cookie
 * @returns Promise<Record<string, string>> All cookies as key-value pairs
 */
export const getAllCookies = async (): Promise<Record<string, string>> => {
  if (!isCookieAvailable()) {
    console.warn('Cookies are not available')
    return {}
  }

  try {
    if (isCookieStoreAvailable() && window.cookieStore) {
      const cookies = await window.cookieStore.getAll()
      return cookies.reduce((acc: Record<string, string>, cookie: { name: string; value: string }) => {
        acc[cookie.name] = cookie.value
        return acc
      }, {})
    } else {
      const cookies = document.cookie.split(';')
      return cookies.reduce((acc: Record<string, string>, cookie) => {
        const [key, value] = cookie.trim().split('=')
        if (key && value) {
          acc[key] = decodeURIComponent(value)
        }
        return acc
      }, {})
    }
  } catch (error) {
    console.error('Error getting all cookies:', error)
    return {}
  }
}

/**
 * Clear all cookies (note: this may not work for all cookies due to domain/path restrictions)
 * @returns Promise<boolean> indicating success
 */
export const clearAllCookies = async (): Promise<boolean> => {
  if (!isCookieAvailable()) {
    console.warn('Cookies are not available')
    return false
  }

  try {
    const allCookies = await getAllCookies()
    const removePromises = Object.keys(allCookies).map((key) => {
      // Only remove cookies that match our COOKIE_KEY type
      if (Object.values(COOKIE_KEY).includes(key as CookieKey)) {
        return removeCookie(key as CookieKey)
      }
      return Promise.resolve(true)
    })

    await Promise.all(removePromises)
    return true
  } catch (error) {
    console.error('Error clearing all cookies:', error)
    return false
  }
}

/**
 * Subscribe to cookie changes (only works with Cookie Store API)
 * @param callback - Function to call when cookies change
 * @returns Function to unsubscribe
 */
export const subscribeToCookieChanges = (
  callback: (event: { changed: { name: string; value: string }[]; deleted: { name: string }[] }) => void,
): (() => void) | null => {
  if (!isCookieStoreAvailable() || !window.cookieStore) {
    console.warn('Cookie Store API is not available for subscriptions')
    return null
  }

  try {
    const handleChange = (event: { changed?: { name: string; value: string }[]; deleted?: { name: string }[] }) => {
      callback({
        changed: event.changed || [],
        deleted: event.deleted || [],
      })
    }

    window.cookieStore.addEventListener('change', handleChange)

    return () => {
      if (window.cookieStore) {
        window.cookieStore.removeEventListener('change', handleChange)
      }
    }
  } catch (error) {
    console.error('Error subscribing to cookie changes:', error)
    return null
  }
}
