import styled from 'styled-components'

const InputFeedback = ({ text }: { text: string }) => {
  return <Div>{text}</Div>
}

export default InputFeedback

const Div = styled.div`
  position: absolute;
  width: 100%;
  top: 53px;
  z-index: 99;
  padding: 15px 30px;
  border-radius: 4px;
  color: #830294;
  background-color: #e48241;
`
