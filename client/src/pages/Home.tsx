import { Route, Routes } from 'react-router-dom'
import { useSocket } from '../features/chats/hooks/useSocket'
import Inboxes from './Inboxes'
import SingleChat from './SingleChat'

const Home = () => {
  const socket = useSocket()

  return (
    <Routes>
      <Route path="/" element={<Inboxes socket={socket} />} />
      <Route path="/chat/:id" element={<SingleChat socket={socket} />} />
    </Routes>
  )
}

export default Home
