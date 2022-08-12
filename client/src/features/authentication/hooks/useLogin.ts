import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { sendCredentials } from '../services/sendCredentials'
import { LOGIN_URL } from './../../../utils/urls'

export type TLogInCredential = {
  email: string
  password: string
}

const useLogin = () => {
  const navigate = useNavigate()
  const { auth, setAuth } = useAuth()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (auth) navigate('/', { replace: true })
  }, [auth])

  const login = async (credential: TLogInCredential) => {
    try {
      setIsLoading(true)
      const response = await sendCredentials(credential, LOGIN_URL)
      const data = await response.json()

      if (data?.message) {
        setError(data?.message || data[0]?.message) //if data is an array mean that we have errors from zod
        return
      }

      const { accessToken, socketToken } = data
      setAuth(() => ({
        accessToken,
        socketToken,
      }))
    } catch (error) {
      setError('something went wrong. Try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading, error, setError }
}

export default useLogin
