import TogglerButton from '../components/ThemeTogglerBtn'
import { ThemeProps } from '../styles/themes'

type TProps = {
  theme: ThemeProps
  themeToggler: () => void
}

const Header = ({ theme, themeToggler }: TProps) => {
  return (
    <>
      <div>Header</div>
      <TogglerButton themeToggler={themeToggler} theme={theme} />
    </>
  )
}

export default Header
