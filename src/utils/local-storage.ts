/**
 * Utility functions for localStorage operations
 * Provides type-safe localStorage operations with error handling
 */

import { STORAGE_KEY } from "@/constants/storage-key"

// Type for valid storage keys
type StorageKey = (typeof STORAGE_KEY)[keyof typeof STORAGE_KEY]

/**
 * Check if localStorage is available
 * Useful for SSR environments like Next.js
 */
export const isLocalStorageAvailable = (): boolean => {
  try {
    return typeof window !== "undefined" && "localStorage" in window
  } catch {
    return false
  }
}

/**
 * Set an item in localStorage
 * @param key - The key to store the value under (must be from STORAGE_KEY)
 * @param value - The value to store (will be JSON stringified)
 * @returns boolean indicating success
 */
export const setLocalStorageItem = <T>(key: StorageKey, value: T): boolean => {
  if (!isLocalStorageAvailable()) {
    console.warn("localStorage is not available")
    return false
  }

  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
    return true
  } catch (error) {
    console.error("Error setting localStorage item:", error)
    return false
  }
}

/**
 * Get an item from localStorage
 * @param key - The key to retrieve the value for (must be from STORAGE_KEY)
 * @param defaultValue - Default value to return if key doesn't exist
 * @returns The parsed value or default value
 */
export const getLocalStorageItem = <T>(key: StorageKey, defaultValue?: T): T | undefined => {
  if (!isLocalStorageAvailable()) {
    console.warn("localStorage is not available")
    return defaultValue
  }

  try {
    const item = localStorage.getItem(key)
    if (item === null) {
      return defaultValue
    }
    try {
      return JSON.parse(item) as T
    } catch {
      return item as T
    }
  } catch (error) {
    console.error("Error getting localStorage item:", error)
    return defaultValue
  }
}

/**
 * Remove an item from localStorage
 * @param key - The key to remove (must be from STORAGE_KEY)
 * @returns boolean indicating success
 */
export const removeLocalStorageItem = (key: StorageKey): boolean => {
  if (!isLocalStorageAvailable()) {
    console.warn("localStorage is not available")
    return false
  }

  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error("Error removing localStorage item:", error)
    return false
  }
}

/**
 * Clear all localStorage items
 * @returns boolean indicating success
 */
export const clearLocalStorage = (): boolean => {
  if (!isLocalStorageAvailable()) {
    console.warn("localStorage is not available")
    return false
  }

  try {
    localStorage.clear()
    return true
  } catch (error) {
    console.error("Error clearing localStorage:", error)
    return false
  }
}

/**
 * Get all localStorage keys
 * @returns Array of all localStorage keys
 */
export const getLocalStorageKeys = (): string[] => {
  if (!isLocalStorageAvailable()) {
    console.warn("localStorage is not available")
    return []
  }

  try {
    return Object.keys(localStorage)
  } catch (error) {
    console.error("Error getting localStorage keys:", error)
    return []
  }
}

/**
 * Check if a key exists in localStorage
 * @param key - The key to check for (must be from STORAGE_KEY)
 * @returns boolean indicating if key exists
 */
export const hasLocalStorageItem = (key: StorageKey): boolean => {
  if (!isLocalStorageAvailable()) {
    return false
  }

  try {
    return localStorage.getItem(key) !== null
  } catch (error) {
    console.error("Error checking localStorage item:", error)
    return false
  }
}
