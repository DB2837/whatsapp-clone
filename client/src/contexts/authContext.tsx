import { createContext, useMemo, useState } from 'react'

type TContext = {
  auth: TAuth | null
  setAuth: React.Dispatch<React.SetStateAction<TAuth | null>>
}

type TAuth = {
  accessToken: string
  socketToken: string
}

const AuthContext = createContext<TContext>({} as TContext)

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [auth, setAuth] = useState<TAuth | null>(null)
  /*  const value = useMemo(
    () => ({
      auth,
      setAuth,
    }),
    [auth]
  ) */

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
