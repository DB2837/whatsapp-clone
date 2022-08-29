import React, { useState, useEffect } from 'react'
import useCustomFetch from './useCustomFetch'

const useFetchData = (urls: string[]) => {
  const _fetch = useCustomFetch()
  const [data, setData] = useState<React.SetStateAction<any>>(null)
  const [error, setError] = useState<React.SetStateAction<boolean>>(false)
  const [loading, setLoading] = useState<React.SetStateAction<boolean>>(true)

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
        setError(false)
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    })()

    return () => controller.abort()
  }, [])

  return [data, loading, error]
}

export default useFetchData
