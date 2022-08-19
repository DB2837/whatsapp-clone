import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Loader from '../components/Loader'
import Chatbox from '../features/chats/components/Chatbox'
import useFetchData from '../hooks/useFetchData'
import { CHAT_URL } from '../utils/urls'

const SingleChat = () => {
  const { id } = useParams()
  const { data, loading } = useFetchData([`${CHAT_URL}${id}`])
  const userRef = useRef(JSON.parse(localStorage.getItem('user') ?? ''))

  return (
    <Container>
      <ChatsWrapper>
        {loading ? (
          <Loader />
        ) : data[0] ? (
          <Chatbox chat={data[0]} user={userRef.current} />
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
