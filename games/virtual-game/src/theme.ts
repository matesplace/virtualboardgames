import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

let theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red,
    // {
    //   main: '#007ACC'
    // },
    // secondary: {
    //   main: '#F78070'
    // },
  },
});
theme = responsiveFontSizes(theme);

export default theme;