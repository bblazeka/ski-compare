import { createTheme } from '@material-ui/core';
import { Theme } from '@material-ui/core';


export const theme: Theme = createTheme({
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