import { MuiThemeProvider } from "@material-ui/core/styles";

import type { AppProps } from "next/app";

import { theme } from "../src/theme";

import "../styles/globals.css";
import "../translations/i18n";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MuiThemeProvider theme={theme}>
      <Component {...pageProps} />
    </MuiThemeProvider>
  );
}
export default MyApp;
