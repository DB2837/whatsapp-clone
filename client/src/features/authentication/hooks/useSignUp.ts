import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { sendCredentials } from '../services/sendCredentials'
import { SIGNUP_URL } from './../../../utils/urls'

export type TSignupCredential = {
  email: string
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
}

const useSingUp = () => {
  const navigate = useNavigate()
  const { auth } = useAuth()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (auth) navigate('/', { replace: true })
  }, [auth])

  const signup = async (credential: TSignupCredential) => {
    try {
      setIsLoading(true)
      const response = await sendCredentials(credential, SIGNUP_URL)
      const data = await response.json()

      if (data?.message) {
        setError(data?.message || data[0]?.message) //if data is an array mean that we have errors from zod
        return
      }

      navigate('/login', { replace: true })
    } catch (error) {
      setError('something went wrong. Try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error, setError }
}

export default useSingUp
