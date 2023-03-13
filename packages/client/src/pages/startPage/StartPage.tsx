import NavigateLinks from '../../features/startPage/components/navigateLinks/NavigateLinks';
import NumberOfPlayersButtons from '../../features/startPage/components/numberOfPlayersButtons/NumberOfPlayersButtons';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import classes from './startPage.module.css';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { useEffect } from 'react';
import { addUserToDB } from '@/store/user/thunk';

const theme = createTheme({
  typography: {
    fontFamily: 'Orbitron',
  },
});

export default function StartPage() {
  const user = useAppSelector(state => state.userReducer.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addUserToDB({ userId: user?.id, userName: user?.display_name }));
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <div
        data-testid="startPage-component"
        className={classes.startPageWrapper}>
        <Typography variant="h2" className={classes.startPageTitle}>
          BOMBERMAN
        </Typography>
        <NumberOfPlayersButtons />
        <NavigateLinks />
      </div>
    </ThemeProvider>
  );
}
