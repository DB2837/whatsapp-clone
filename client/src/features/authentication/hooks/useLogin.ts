import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { useAuth } from './useAuth'
import { sendCredentials } from '../services/sendCredentials'
import { LOGIN_URL } from './../../../utils/urls'

export type TLogInCredential = {
  email: string
  password: string
}

export type TPayload = {
  id: string
  email: string
  firstName: string
  lastName: string
  iat: number
  exp: number
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
      const payload: TPayload = jwt_decode(accessToken as string)
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: payload.id,
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
        })
      )

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
