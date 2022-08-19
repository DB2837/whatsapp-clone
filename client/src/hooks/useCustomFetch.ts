import { useState } from 'react'
import { useAuth } from '../features/authentication/hooks/useAuth'
import useRefreshToken from '../features/authentication/hooks/useRefreshToken'
import { BASE_URL } from '../utils/urls'

export type TFetchOptions = {
  method?: string
  mode?: RequestMode
  cache?: RequestCache
  credentials?: RequestCredentials
  headers?: HeadersInit
  redirect?: RequestRedirect
  referrerPolicy?: ReferrerPolicy
  body?: BodyInit | null
  signal?: AbortSignal
}

const useCustomFetch = () => {
  const { refresh } = useRefreshToken()
  const { auth } = useAuth()
  /*  const [isLoading, setIsLoading] = useState<boolean>(false) */

  const defaultOptions = {
    method: 'GET',
    mode: 'cors' as RequestMode,
    credentials: 'include' as RequestCredentials,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${auth?.accessToken}`,
    },
  }

  const _fetch = async (url: string, options?: TFetchOptions) => {
    try {
      const fetchOptions = {
        ...defaultOptions,
        ...options,
      }
      const response = await fetch(`${url}`, fetchOptions)

      if (response.status === 403) {
        const accessToken = await refresh()

        fetchOptions.headers = {
          ...fetchOptions.headers,
          authorization: `Bearer ${accessToken}`,
        }

        const response = await fetch(`${url}`, {
          ...fetchOptions,
        })

        return response
      }

      return response
    } catch (err: any) {
      console.log(err)
    }
  }

  return _fetch
}

export default useCustomFetch
