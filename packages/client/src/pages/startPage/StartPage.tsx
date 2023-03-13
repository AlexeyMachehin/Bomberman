import NavigateLinks from '../../features/startPage/components/navigateLinks/NavigateLinks';
import NumberOfPlayersButtons from '../../features/startPage/components/numberOfPlayersButtons/NumberOfPlayersButtons';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import classes from './startPage.module.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Orbitron',
  },
});

export default function StartPage() {
  return (
    <ThemeProvider theme={theme}>
      <div data-testid="startPage-component" className={classes.startPageWrapper}>
        <Typography variant="h2" className={classes.startPageTitle}>
          BOMBERMAN
        </Typography>
        <NumberOfPlayersButtons />
        <NavigateLinks />
      </div>
    </ThemeProvider>
  );
}
