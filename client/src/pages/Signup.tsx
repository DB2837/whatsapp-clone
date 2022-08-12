import { useRef, useState } from 'react'
import styled from 'styled-components'
import { z } from 'zod'
import Loader from '../components/Loader'
import InputBox from '../features/authentication/components/InputBox'
import InputFeedback from '../features/authentication/components/InputFeedback'
import {
  Container,
  ErrorBox,
  Form,
  FormWrapper,
  Options,
  SubmitButton,
} from '../features/authentication/components/styled'
import useSingUp from '../features/authentication/hooks/useSignUp'
import { DisabledBtn } from '../styles/DisabledBtn'
import { validateInputs } from '../utils/validateInputs'

const emailSchema = z.object({
  email: z.string().email(),
})

const nameSchema = z.object({
  name: z.string().regex(/^[a-zA-Z ]{2,14}$/),
})

const passwordSchema = z.object({
  password: z
    .string()
    .min(6)
    .max(24)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/),
})

const Signup = () => {
  const { signup, isLoading, error, setError } = useSingUp()
  const [credential, setCredential] = useState(() => ({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  }))

  const [inputsFocus, setInputsFocus] = useState(() => ({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  }))

  const isValidEmail = validateInputs(emailSchema, { email: credential.email })
  const isValidFirstName = validateInputs(nameSchema, {
    name: credential.firstName,
  })
  const isValidLastName = validateInputs(nameSchema, {
    name: credential.lastName,
  })
  const isValidPassword = validateInputs(passwordSchema, {
    password: credential.password,
  })
  const isValidPasswordConfirm =
    credential.password === credential.confirmPassword

  const areValidInputs =
    isValidEmail &&
    isValidFirstName &&
    isValidLastName &&
    isValidPassword &&
    isValidPasswordConfirm

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    setInputsFocus((prevState) => ({
      ...prevState,
      [e.target.name]: true,
    }))
  }

  const handleBlur = () => {
    setInputsFocus(() => ({
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      confirmPassword: false,
    }))
  }

  const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredential((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    signup(credential)
  }

  return (
    <Container>
      {error && <ErrorBox>{error}</ErrorBox>}
      {isLoading && <Loader />}
      <FormWrapper>
        <Form>
          <InputBox
            labelName="email"
            labelHTMLFOR="email"
            inputType="email"
            inputName="email"
            placeholder="Email"
            value={credential.email}
            isFocused={inputsFocus.email}
            isValidInput={isValidEmail}
            onChange={handleInputsChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <Wrapper>
            <InputBox
              labelName="first name"
              labelHTMLFOR="firstName"
              inputType="text"
              inputName="firstName"
              placeholder="First Name"
              value={credential.firstName}
              isFocused={inputsFocus.firstName}
              isValidInput={isValidFirstName}
              onChange={handleInputsChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {inputsFocus.firstName && !isValidFirstName && (
              <InputFeedback
                text="2 to 14 characters. 
             No numbers, underscores, hyphens allowed."
              />
            )}
          </Wrapper>
          <Wrapper>
            <InputBox
              labelName="last name"
              labelHTMLFOR="lastName"
              inputType="text"
              inputName="lastName"
              placeholder="Last Name"
              value={credential.lastName}
              isFocused={inputsFocus.lastName}
              isValidInput={isValidLastName}
              onChange={handleInputsChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {inputsFocus.lastName && !isValidLastName && (
              <InputFeedback
                text="2 to 14 characters. 
             No numbers, underscores, hyphens allowed."
              />
            )}
          </Wrapper>

          <Wrapper>
            <InputBox
              labelName="password"
              labelHTMLFOR="password"
              inputType="password"
              inputName="password"
              placeholder="Password"
              value={credential.password}
              isFocused={inputsFocus.password}
              isValidInput={isValidPassword}
              onChange={handleInputsChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {inputsFocus.password && !isValidPassword && (
              <InputFeedback
                text="6 to 24 characters. Must include uppercase and lowercase
                letters, a number and a special character.
                Allowed special characters: !@#$%"
              />
            )}
          </Wrapper>
          <InputBox
            labelName="confirm password"
            labelHTMLFOR="confirmPassword"
            inputType="password"
            inputName="confirmPassword"
            placeholder="Confirm Password"
            value={credential.confirmPassword}
            isFocused={inputsFocus.confirmPassword}
            isValidInput={
              credential.confirmPassword !== '' && isValidPasswordConfirm
            }
            onChange={handleInputsChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {areValidInputs ? (
            <SubmitButton onClick={handleSubmit}>SIGN IN</SubmitButton>
          ) : (
            <DisabledBtn disabled>SIGN UP</DisabledBtn>
          )}

          <Options>
            <h4>Already have an account? Sign in</h4>
          </Options>
        </Form>
      </FormWrapper>
    </Container>
  )
}

export default Signup

const Wrapper = styled.div`
  position: relative;
`
