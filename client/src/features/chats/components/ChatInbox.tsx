import React from 'react'
import styled from 'styled-components'
import Avatar from './Avatar'

type Message = {
  sentBy: string
  sentAt: string
  text: string
}

type TProps = {
  chatUserName?: string
  chatPic?: string
  unreadMessagesNum?: number
  lastMessage?: Message
}

const ChatInbox = ({
  chatUserName,
  lastMessage,
  chatPic,
  unreadMessagesNum,
}: TProps) => {
  return (
    <Container>
      <InfoDiv>
        {' '}
        <Avatar />
      </InfoDiv>
      <TextDiv>
        <h4>chat name</h4>
        <p>username: some more message text...</p>
      </TextDiv>
      <InfoDiv>
        <p>21:34</p>
        <UnreadNum>2</UnreadNum>
      </InfoDiv>
    </Container>
  )
}

export default ChatInbox

const Container = styled.div`
  display: flex;

  width: 100%;
  min-height: 70px;
  border: 2px solid #fff;
  padding: 0.5rem;
`

const TextDiv = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 0.5rem;
  /*  border: 2px solid #fff; */
`

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
  /*  border: 2px solid #fff; */
`

const UnreadNum = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 0.5rem;
  height: 1.4rem;
  width: 1.4rem;
  border-radius: 50%;
  /*  border: 2px solid #fff; */
  background-color: #018f20;
  color: #0e0e0e;
  font-weight: bold;
`
