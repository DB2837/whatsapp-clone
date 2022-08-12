import React from 'react'
import styled from 'styled-components'
import ChatInbox from './ChatInbox'

const InboxContainer = () => {
  return (
    <Wrapper>
      <ChatInbox />
      <ChatInbox />
      <ChatInbox />
      <ChatInbox />
    </Wrapper>
  )
}

export default InboxContainer

const Wrapper = styled.div`
  width: 100%;
  max-width: 680px;
  min-width: 335px;
`
