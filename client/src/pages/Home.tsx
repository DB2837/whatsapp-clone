import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import Loader from '../components/Loader'
import useLogout from '../features/authentication/hooks/useLogout'
import useRefreshToken from '../features/authentication/hooks/useRefreshToken'
import InboxContainer from '../features/chats/components/InboxContainer'
import { useSocket } from '../features/chats/hooks/useSocket'
import useFetchData from '../hooks/useFetchData'
import { INBOXES_URL } from '../utils/urls'

const Home = () => {
  const { refresh } = useRefreshToken()
  const { logout } = useLogout()
  const socket = useSocket()

  const { data, loading } = useFetchData([INBOXES_URL])

  useEffect(() => {
    socket?.on('message', (data: any) => {
      console.log({ data })
      /*  console.log({ from }) */
    })
  }, [socket])

  return (
    <Container>
      <div>Home</div>
      <button onClick={refresh}>refresh</button>
      <button onClick={logout}>logout</button>

      <ChatsWrapper>
        {loading ? <Loader /> : <InboxContainer inboxes={data[0]} />}
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
