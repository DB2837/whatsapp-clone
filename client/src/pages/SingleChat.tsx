import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Loader from '../components/Loader'
import Chatbox from '../features/chats/components/Chatbox'
import useFetchData from '../hooks/useFetchData'
import { TSocket } from '../types'
import { CHAT_URL } from '../utils/urls'

type TProps = {
  socket: TSocket | null
}

const SingleChat = ({ socket }: TProps) => {
  const { id } = useParams()
  const [chatArr, loading] = useFetchData([`${CHAT_URL}${id}`])
  const userRef = useRef(JSON.parse(localStorage.getItem('user') ?? ''))

  return (
    <Container>
      <ChatsWrapper>
        {loading ? (
          <Loader />
        ) : chatArr[0] ? (
          <Chatbox chat={chatArr[0]} user={userRef.current} socket={socket} />
        ) : (
          ''
        )}
      </ChatsWrapper>
    </Container>
  )
}

export default SingleChat

const Container = styled.div`
  /*  height: 100%; */
  height: 100vh;
  border: 2px solid #fff;
`

const ChatsWrapper = styled.main`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  border: 2px solid red;
  height: 100%;
`
