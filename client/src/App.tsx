import { Routes, Route } from 'react-router-dom'
import useThemeMode from './hooks/useThemeMode'
import Login from './pages/Login'
import GlobalStyle from './styles/global'
import { ThemeProvider } from 'styled-components'
import ProtectedRoute from './features/authentication/components/ProtectedRoute'
import SharedLayout from './layouts/SharedLayout'
import Signup from './pages/Signup'
import PersistentLogin from './features/authentication/components/PersistentLogin'
import Home from './pages/Home'

function App() {
  const { theme, themeToggler } = useThemeMode()

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Routes>
        <Route element={<PersistentLogin />}>
          <Route
            element={<SharedLayout themeToggler={themeToggler} theme={theme} />}
          >
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/*" element={<Home />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
