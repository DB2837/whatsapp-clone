export interface ThemeProps {
  name: string
  background: string
  primary: string
  secondary: string
  card: string
  divider: string
  buttonBG: string
  buttonBGHover: string
  buttonText: string
}

export const darkTheme: ThemeProps = {
  name: 'dark',
  background: '#1f2226',
  primary: '#f2f2f2',
  secondary: '#404040',
  card: '#3b4149',
  divider: '#454545',
  buttonBG: '#05466499',
  buttonBGHover: '#054664',
  buttonText: '#f5f5f5',
}

export const lightTheme: ThemeProps = {
  name: 'light',
  background: '#e4e4e4',
  primary: '#15202b',
  secondary: '#707070',
  card: '',
  divider: '',
  buttonBG: '#1b65a5d1',
  buttonBGHover: '#1b65a5',
  buttonText: '#f1f1f1',
}
