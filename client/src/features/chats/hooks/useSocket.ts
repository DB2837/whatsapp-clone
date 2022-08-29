import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { TSocket } from '../../../types'
import { useAuth } from '../../authentication/hooks/useAuth'

export const useSocket = () => {
  const { auth } = useAuth()
  const [socket, setSocket] = useState<TSocket | null>(null)

  useEffect(() => {
    const socket = io('http://localhost:3001', {
      withCredentials: true,
      auth: {
        token: auth?.socketToken,
      },
    })

    setSocket(() => socket)

    socket.on('connect', () => {
      console.log(socket.id)
    })

    return () => {
      socket.close()
    }
  }, [setSocket])

  return socket
}
