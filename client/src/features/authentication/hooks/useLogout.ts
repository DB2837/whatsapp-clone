import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { LOGOUT_URL } from '../../../utils/urls'

const useLogout = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuth()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const logout = async () => {
    try {
      setIsLoading(true)

      await fetch(`${LOGOUT_URL}`, {
        credentials: 'include',
      })

      localStorage.removeItem('user')
      setAuth(null)
      navigate('/login', { replace: true })
    } catch (err) {
      setError('something went wrong. Try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return { logout, error, setError, isLoading }
}

export default useLogout
