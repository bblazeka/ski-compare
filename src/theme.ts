import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { createMuiTheme } from '@material-ui/core';
import { Theme } from '@material-ui/core';


export const theme: Theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: 'rgb(220, 0, 78)',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
  },
});

module.exports = { theme };