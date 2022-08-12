import { Outlet } from 'react-router-dom'
import { ThemeProps } from '../styles/themes'
import Header from './Header'

type TProps = {
  theme: ThemeProps
  themeToggler: () => void
}

const SharedLayout = ({ theme, themeToggler }: TProps) => {
  return (
    <>
      <Header themeToggler={themeToggler} theme={theme} />
      <Outlet />
    </>
  )
}

export default SharedLayout
