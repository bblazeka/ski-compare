import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { theme } from '../src/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';

function MyApp({ Component, pageProps }: AppProps) {
  return (<MuiThemeProvider theme={theme}>
    <Component {...pageProps} />
  </MuiThemeProvider>);
}
export default MyApp
