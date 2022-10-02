import { colors } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.orange[900]
    },
    secondary: {
      main: "#11cb5f",
    },
  },
});

export default theme;