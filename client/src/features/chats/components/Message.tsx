import styled from 'styled-components'

type TProps = {
  sender: any
  text: string
  currentUserID: string
  isGroupChat: boolean
}

const Message = ({ sender, text, currentUserID, isGroupChat }: TProps) => {
  const isCurrentUserMessage = currentUserID === sender.id

  return (
    <Wrapper>
      {isGroupChat && !isCurrentUserMessage && (
        <SenderName isCurrentUserMessage={isCurrentUserMessage}>
          {sender.firstName} {sender.lastName[0]}
        </SenderName>
      )}

      <TextContainer isCurrentUserMessage={isCurrentUserMessage}>
        <P isCurrentUserMessage={isCurrentUserMessage}>{text}</P>
      </TextContainer>
    </Wrapper>
  )
}

export default Message

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.6rem 1.2rem;
`

type MessageProps = {
  isCurrentUserMessage: boolean
}

const SenderName = styled.h4<MessageProps>`
  display: flex;
  justify-content: ${({ isCurrentUserMessage }) =>
    isCurrentUserMessage ? 'flex-end' : 'flex-start'};
`

const TextContainer = styled.div<MessageProps>`
  display: flex;
  justify-content: ${({ isCurrentUserMessage }) =>
    isCurrentUserMessage ? 'flex-end' : 'flex-start'};
`

const P = styled.p<MessageProps>`
  padding: 0.5rem;
  background-color: ${({ isCurrentUserMessage }) =>
    isCurrentUserMessage ? '#01a732' : '#363636'};

  border-radius: 5px;
  width: fit-content;
  max-width: 310px;
`
