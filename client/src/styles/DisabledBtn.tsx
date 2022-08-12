import styled from 'styled-components'
import { ThemeProps } from './themes'

type TProps = {
  theme: ThemeProps
}

export const DisabledBtn = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 4px;
  letter-spacing: 1.2px;
  font-size: inherit;
  font-weight: bold;
  opacity: 0.6;
  background-color: #969696;
  color: #ffffff;
  outline: none;
  border: 3px solid ${({ theme }: TProps) => theme.primary};
`
