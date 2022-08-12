import { TSignupCredential } from '../hooks/useSignUp'
import { TLogInCredential } from '../hooks/useLogin'

export const sendCredentials = (
  credentials: TSignupCredential | TLogInCredential,
  url: string
) => {
  return fetch(`${url}`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(credentials),
  })
}
