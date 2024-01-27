import { ThemeProvider, createTheme } from '@mui/material/styles'
import { addDecorator } from '@storybook/react'
import '../src/styles/globals.css'

const theme = createTheme({
  colors: {
    backgroundColor: 'black',
    fontColor: 'white',
    titleColor: '#1890ff',
    highlighterColor: 'yellowgreen',
  },
  name: 'theme1',
})

// pass ThemeProvider and array of your themes to decorator
addDecorator((story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)
