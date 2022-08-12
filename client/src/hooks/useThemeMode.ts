import { darkTheme, lightTheme } from '../styles/themes'
import useLocalStorage from './useLocalStorage'

export const useThemeMode = () => {
  const [themeMode, setThemeMode] = useLocalStorage('themeMode', 'dark')
  const theme = themeMode === 'dark' ? darkTheme : lightTheme

  const themeToggler = () =>
    themeMode === 'dark' ? setThemeMode('light') : setThemeMode('dark')

  return { theme, themeToggler }
}
export default useThemeMode
