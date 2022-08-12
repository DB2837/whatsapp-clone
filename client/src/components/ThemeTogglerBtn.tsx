import { HiMoon } from 'react-icons/hi'
import { GiSun, GiMoon } from 'react-icons/gi'
import useThemeMode from '../hooks/useThemeMode'
import useLocalStorage from '../hooks/useLocalStorage'
import { ThemeProps } from '../styles/themes'
/* import * as S from './styles' */

type TProps = {
  theme: ThemeProps
  themeToggler: () => void
}

const TogglerButton = ({ theme, themeToggler }: TProps) => {
  return (
    <>
      {theme.name === 'dark' && (
        <GiSun style={Sunstyles} onClick={themeToggler} />
      )}
      {theme.name === 'light' && (
        <HiMoon style={Moonstyles} onClick={themeToggler} />
      )}
    </>
  )
}

export default TogglerButton

const Sunstyles = {
  cursor: 'pointer',
  fontSize: '1.8rem',
  color: '#d4d245',
}

const Moonstyles = {
  cursor: 'pointer',
  fontSize: '1.8rem',
  color: '#0e144dcf',
  /*  border: '#121212', */
}
