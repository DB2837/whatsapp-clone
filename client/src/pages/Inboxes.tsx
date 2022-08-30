import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Loader from '../components/Loader'
import useLogout from '../features/authentication/hooks/useLogout'
import useRefreshToken from '../features/authentication/hooks/useRefreshToken'
import InboxContainer from '../features/chats/components/InboxContainer'
import useCustomFetch from '../hooks/useCustomFetch'
import useDebounce from '../hooks/useDebounce'
import useFetchData from '../hooks/useFetchData'
import { TSocket } from '../types'
import { INBOXES_URL, USERS_BY_EMAIL } from '../utils/urls'

type TProps = {
  socket: TSocket | null
}

type User = {
  email: string
  profilePic: string
  isOnline: boolean
}

const Inboxes = ({ socket }: TProps) => {
  const { refresh } = useRefreshToken()
  const { logout } = useLogout()
  const _fetch = useCustomFetch()
  const [inboxesArr, loading] = useFetchData([INBOXES_URL])
  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedSearch = useDebounce(searchValue, 1000)
  const [users, setUsers] = useState([] as User[])

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await _fetch(
        `${USERS_BY_EMAIL}${debouncedSearch}`
      ).then((res) => res?.json())
      console.log(fetchedUsers)
      setUsers(fetchedUsers)
    }

    if (debouncedSearch) fetchUsers()
  }, [debouncedSearch])

  const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)

    if (!searchValue) setUsers(() => [] as User[])
  }

  return (
    <Container>
      <div>Home</div>
      <button onClick={refresh}>refresh</button>
      <button onClick={logout}>logout</button>
      <InputBox>
        <input value={searchValue} onChange={handleInputsChange} />
        {searchValue &&
          users.map((user) => {
            return <div key={user.email}>{user.email}</div>
          })}
      </InputBox>

      <ChatsWrapper>
        {loading ? (
          <Loader />
        ) : inboxesArr[0] ? (
          <InboxContainer inboxesArr={inboxesArr[0]} socket={socket} />
        ) : (
          ''
        )}
      </ChatsWrapper>
    </Container>
  )
}

export default Inboxes

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

const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const UsersBox = styled.div``
