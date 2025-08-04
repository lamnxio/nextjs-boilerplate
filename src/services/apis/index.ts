"use client"

import { STORAGE_KEY } from "@/constants/storage-key"
import { ApiConfig, PetstoreApi } from "@/services/apis/petstore-api.gen"
import { getLocalStorageItem } from "@/utils/local-storage"
import { AxiosError, AxiosResponse } from "axios"
import qs from "qs"

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

class ExtendedPetstoreApi extends PetstoreApi<string> {
  constructor(config: ApiConfig<string>) {
    super(config)
    this.setup()
  }

  private setup() {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error: AxiosError<{ message: string }>) => {
        return Promise.reject(error)
      },
    )

    const accessToken = getLocalStorageItem<string>(STORAGE_KEY.ACCESS_TOKEN)
    if (accessToken) this.setSecurityData(accessToken)
  }
}

export const api = new ExtendedPetstoreApi({
  securityWorker,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  paramsSerializer: (params) =>
    qs.stringify(params, {
      arrayFormat: "repeat",
    }),
})
