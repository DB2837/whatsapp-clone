import React, { useState, useEffect } from 'react'
import { useAuth } from '../features/authentication/hooks/useAuth'
import useCustomFetch, { TFetchOptions } from './useCustomFetch'

const useFetchData = (urls: string[]) => {
  const { auth } = useAuth()
  const _fetch = useCustomFetch()
  const [data, setData] = useState<React.SetStateAction<any>>(null)
  const [error, setError] = useState<React.SetStateAction<any>>(null)
  const [loading, setLoading] = useState<React.SetStateAction<boolean>>(true)

  /* const options: TFetchOptions = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${auth?.accessToken}`,
    },
  } */

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    ;(async () => {
      try {
        const data = await Promise.all(
          urls.map((url) =>
            _fetch(url, { signal: signal }).then((response) => response?.json())
          )
        )

        setData(data)
        setError(null)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    })()

    return () => controller.abort()
  }, [])

  return { data, loading, error }
}

export default useFetchData
