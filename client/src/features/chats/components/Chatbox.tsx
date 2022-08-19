import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { IoSendSharp } from 'react-icons/io5'
import Message from './Message'
import { useSocket } from '../hooks/useSocket'
import useCustomFetch from '../../../hooks/useCustomFetch'
import { RESET_UNREAD_MESSAGES_URL } from '../../../utils/urls'

type TProps = {
  chat: any
  user: any
}

const Chatbox = ({ chat, user }: TProps) => {
  const navigate = useNavigate()
  const socket = useSocket()
  const _fetch = useCustomFetch()
  const bottomRef = useRef<any>(null)
  const [messages, setMessages] = useState<any>(() => chat.messages)
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    bottomRef.current?.scrollIntoView()
  }, [bottomRef.current])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    _fetch(`${RESET_UNREAD_MESSAGES_URL}${chat.id}`, {
      method: 'PATCH',
    })
  }, [messages])

  useEffect(() => {
    socket?.on('recive message', (message: any) => {
      setMessages((prev: any) => [...prev, message])
      /*  console.log({ from }) */
    })
  }, [socket])

  /* useEffect(() => {
    _fetch(`${RESET_UNREAD_MESSAGES_URL}${chat.id}`, {
      method: 'PATCH',
    })
  }, []) */

  const sendMessage = () => {
    if (!inputValue) return

    socket?.emit('message', {
      content: inputValue,
      conversationID: chat.id,
    })

    setMessages((prev: any) => [
      ...prev,
      {
        text: inputValue,
        sentBy: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
    ])
    setInputValue('')
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      sendMessage()
    }
  }

  const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <Container>
      <TitleContainer>
        <h3 onClick={() => navigate('/')}>Back</h3>
      </TitleContainer>

      <Title>{chat?.name}</Title>

      <Wrapper>
        {messages.map((message: any, index: number) => {
          return (
            <Message
              key={index}
              sender={message.sentBy}
              text={message.text}
              currentUserID={user.id}
              isGroupChat={chat.isGroupChat}
            />
          )
        })}
        <Bottom ref={bottomRef} />
      </Wrapper>
      <InputWrapper>
        <InputBox
          value={inputValue}
          onChange={handleInputsChange}
          onKeyDown={handleKeyPress}
        />
        <SendMessageBtn>
          <IoSendSharp style={IconsStyle} onClick={sendMessage} />
        </SendMessageBtn>
      </InputWrapper>
    </Container>
  )
}

export default Chatbox

const IconsStyle = {
  cursor: 'pointer',
  width: '1.5rem',
  height: '1.5rem',
}

const Bottom = styled.div``

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 680px;
  min-width: 335px;
  border: 2px solid green;
  overflow: auto;
  position: relative;
`

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
`

const InputBox = styled.input`
  width: 100%;
  height: 2.7rem;
  border-radius: 20px;
  padding: 0 1rem;
`

const SendMessageBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 2.7rem;
  height: 2.7rem;
`

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 680px;
  border: 2px solid red;
`

const Title = styled.h3`
  text-align: center;
  font-size: 1.4rem;
  margin: 10px 0;
`
