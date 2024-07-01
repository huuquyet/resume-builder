import '../styles/globals.css'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import { GLOBAL_MUI_THEME } from '../styles/global.theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={GLOBAL_MUI_THEME}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Component {...pageProps} />
          <Analytics />
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default MyApp
