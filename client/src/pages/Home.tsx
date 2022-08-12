import React, { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import DefaultEventsMap from 'socket.io-client'
import styled from 'styled-components'
import { useAuth } from '../features/authentication/hooks/useAuth'
import useLogout from '../features/authentication/hooks/useLogout'
import useRefreshToken from '../features/authentication/hooks/useRefreshToken'
import InboxContainer from '../features/chats/components/InboxContainer'
import { TSocket } from '../types'
import { useSocket } from '../features/chats/hooks/useSocket'

const Home = () => {
  /*  const { auth } = useAuth() */
  const { refresh } = useRefreshToken()
  const { logout } = useLogout()
  const socket = useSocket()

  useEffect(() => {
    socket?.on('private message', (data: any) => {
      console.log({ data })
      /*  console.log({ from }) */
    })
  }, [socket])

  const handleClick = () => {
    socket?.emit('private message', {
      content: 'gg message sent',
      to: 'e1910abc-3c92-4a5d-95ed-7b954cf4320f',
    })
  }

  return (
    <Container>
      <div>Home</div>
      <button onClick={refresh}>refresh</button>
      <button onClick={logout}>logout</button>
      <button onClick={handleClick}>send message</button>
      <ChatsWrapper>
        <InboxContainer />
      </ChatsWrapper>
    </Container>
  )
}

export default Home

const Container = styled.div`
  height: 90vh;
  border: 2px solid #fff;
`

const ChatsWrapper = styled.main`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  border: 2px solid red;
`
