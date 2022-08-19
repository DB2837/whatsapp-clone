import React from 'react'

import styled from 'styled-components'
import ChatInbox from './ChatInbox'

type TProps = {
  inboxes: any[]
}

const InboxContainer = ({ inboxes }: TProps) => {
  return (
    <Wrapper>
      {inboxes &&
        inboxes?.map((inboxe) => {
          return (
            <ChatInbox
              key={inboxe.id}
              id={inboxe.id}
              chatName={inboxe.name}
              lastMessage={inboxe.lastMessage}
              unreadMessagesNum={inboxe.unreadMessages}
            />
          )
        })}
    </Wrapper>
  )
}

export default InboxContainer

const Wrapper = styled.div`
  width: 100%;
  max-width: 680px;
  min-width: 335px;
`
