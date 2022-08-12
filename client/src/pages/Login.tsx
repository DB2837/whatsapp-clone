import { useState } from 'react'
import z from 'zod'
import InputBox from '../features/authentication/components/InputBox'
import useLogin from '../features/authentication/hooks/useLogin'
import Loader from '../components/Loader'
import { DisabledBtn } from '../styles/DisabledBtn'
import { validateInputs } from '../utils/validateInputs'
import {
  Container,
  ErrorBox,
  Form,
  FormWrapper,
  Options,
  SubmitButton,
} from '../features/authentication/components/styled'
import { Link } from 'react-router-dom'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const Login = () => {
  const { login, isLoading, error, setError } = useLogin()
  const [credential, setCredential] = useState(() => ({
    email: '',
    password: '',
  }))

  const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredential((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    login(credential)
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
            onChange={handleInputsChange}
            onFocus={() => setError('')}
          />
          <InputBox
            labelName="password"
            labelHTMLFOR="password"
            inputType="password"
            inputName="password"
            placeholder="Password"
            value={credential.password}
            onChange={handleInputsChange}
            onFocus={() => setError('')}
          />
          {validateInputs(loginSchema, credential) ? (
            <SubmitButton onClick={handleSubmit}>SIGN IN</SubmitButton>
          ) : (
            <DisabledBtn disabled>SIGN IN</DisabledBtn>
          )}

          <Options>
            <h4>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </h4>
            <h4>forgot password? Click here</h4>
          </Options>
        </Form>
      </FormWrapper>
    </Container>
  )
}

export default Login
