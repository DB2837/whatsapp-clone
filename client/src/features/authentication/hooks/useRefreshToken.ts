import { useState } from 'react'
import { REFRESH_TOKEN_URL } from '../../../utils/urls'
import { useAuth } from './useAuth'
import useLogout from './useLogout'

const useRefreshToken = () => {
  const { setAuth } = useAuth()
  const { logout } = useLogout()
  const [isLoading, setIsLoading] = useState(false)

  const refresh = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(REFRESH_TOKEN_URL, {
        method: 'GET',
        credentials: 'include',
      })

      if (response.status === 401) {
        setIsLoading(false)
        await logout()

        return
      }

      const {
        accessToken,
        socketToken,
      }: { accessToken: string; socketToken: string } = await response.json() //for now get socket token on refresh token call, later set it on home whit useEffect and here just set refresh

      setAuth(() => ({ accessToken, socketToken }))
      return accessToken
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return { refresh, isLoading }
}

export default useRefreshToken
