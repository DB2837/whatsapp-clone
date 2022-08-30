import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import { TSocket } from '../../../types'
import ChatInbox from './ChatInbox'

type TProps = {
  inboxesArr: any[]
  socket: TSocket | null
}

const InboxContainer = ({ inboxesArr, socket }: TProps) => {
  const [inboxes, setInboxes] = useState(() => inboxesArr)

  useEffect(() => {
    socket?.on('new inbox', (inbox) => {
      setInboxes((prev) => {
        const filteredInboxes = prev.filter(
          (inboxItem) => inboxItem.id !== inbox.id
        )
        return [inbox, ...filteredInboxes]
      })
    })
  }, [socket])
  return (
    <Wrapper>
      {inboxes?.map((inboxe) => {
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
