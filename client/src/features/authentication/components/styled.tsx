import styled from 'styled-components'
import { ThemeProps } from '../../../styles/themes'

type TProps = {
  theme: ThemeProps
}

export const ErrorBox = styled.div`
  padding: 1rem;
  text-align: center;
  font-size: 1.2rem;
  color: #fd5b5b;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  /*  min-height: 480px; */
  padding: 1rem;
  /*  border: 2px solid red; */
`
export const FormWrapper = styled.div`
  /*  border: 2px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 320px;
  min-height: 320px;
  padding: 0.5rem;
  margin-top: 1rem;

  /*  border: 2px solid #fff; */

  @media (min-width: 540px) {
    min-width: 484px;
    min-height: 484px;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
  /*  width: 320px;
  height: 320px;

  @media (min-width: 500px) {
    width: 484px;
    height: 484px;
  } */
  /*   border: 2px solid red; */
`

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  /* @media (min-width: 540px) {
    flex-direction: row;
  } */
`

export const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 4px;
  letter-spacing: 1.2px;
  font-size: inherit;
  font-weight: bold;
  background-color: #1b65a5e2;
  background-color: ${({ theme }: TProps) => theme.buttonBG};
  color: ${({ theme }: TProps) => theme.buttonText};

  :hover {
    background-color: ${({ theme }: TProps) => theme.buttonBGHover};
  }
`
