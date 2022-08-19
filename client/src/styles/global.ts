import { createGlobalStyle, withTheme } from 'styled-components'
import { ThemeProps } from './themes'

type GlobalThemeProps = {
  theme: ThemeProps
}

const GlobalStyle = createGlobalStyle`
  *,*::after,*::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: 0;
  }

::-webkit-scrollbar {
  display: none; /* chrome */
}

-ms-overflow-style:none; /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  :root {
  font-family:'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
 /*  color-scheme: light dark;
  color: rgba(255 255 255 / 87%);
  background-color: #242424; */
  font-synthesis: none;
  text-rendering: optimizelegibility;
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  
  }


  body { 
  height:100%;
  min-height: 100vh;
  min-width: 320px;
  color: ${({ theme }: GlobalThemeProps) => theme.primary} /* #e4e6eb */;
  background-color:${({ theme }: GlobalThemeProps) =>
    theme.background}/* #131313 */;
  position: relative;

  a:-webkit-any-link {
  text-decoration: none;
  color: ${({ theme }: GlobalThemeProps) => theme.primary};
  cursor: pointer;
  }
}
`

export default withTheme(GlobalStyle)
