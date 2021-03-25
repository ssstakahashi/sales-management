
import { createMuiTheme } from '@material-ui/core/styles';

// Pick colors on https://material.io/resources/color/#!/

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#dddddd',
      main: '#bbbbbb',
      dark: '#666666',
      contrastText: '#FFF',
    },
    secondary: {
      light: '#e6d6b8',
      main: '#e6b85c',
      dark: '#cca352',
      contrastText: '#FFF',
    },
    third: {
      light: '#ff5B59',
      main: '#332914',
      dark: '#A40000',
      contrastText: '#FFF',
    }, 
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#d5d5d5",
      A200: "#aaaaaa",
      A400: "#303030",
      A700: "#616161"
    }
  },
});