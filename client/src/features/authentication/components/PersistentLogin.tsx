import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Loader from '../../../components/Loader'
import { useAuth } from '../hooks/useAuth'
import useRefreshToken from '../hooks/useRefreshToken'

const PersistentLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { refresh } = useRefreshToken()

  useEffect(() => {
    ;(async () => await refresh())()
    setIsLoading(false)
  }, [])

  return isLoading ? <Loader /> : <Outlet />
}

export default PersistentLogin
