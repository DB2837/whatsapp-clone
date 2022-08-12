import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { TSocket } from '../../../types'
import { useAuth } from '../../authentication/hooks/useAuth'

export const useSocket = () => {
  const { auth } = useAuth()
  const socketRef = useRef<TSocket | null>(null)

  useEffect(() => {
    const socket = io('http://localhost:3001', {
      withCredentials: true,
      auth: {
        token: auth?.socketToken,
      },
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log(socket.id)
    })

    return () => {
      socket.close()
    }
  }, [])

  return socketRef.current
}
