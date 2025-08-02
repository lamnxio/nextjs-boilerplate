'use client'

import { STORAGE_KEY } from '@/constants/storage-key'
import { PetstoreApi } from '@/services/apis/petstore-api'
import { getLocalStorageItem } from '@/utils/local-storage'
import qs from 'qs'

const securityWorker = async (securityData: string | null) => {
  if (securityData) {
    return {
      headers: {
        Authorization: `Bearer ${securityData}`,
      },
    }
  }
  return {}
}

export const api = new PetstoreApi({
  securityWorker,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  paramsSerializer: (params) =>
    qs.stringify(params, {
      arrayFormat: 'repeat',
    }),
})

api.setSecurityData(getLocalStorageItem(STORAGE_KEY.ACCESS_TOKEN) || null)
