import { SyntheticEvent } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import classes from './navigateLinks.module.css';
import { Link as RouterLink } from 'react-router-dom'

const preventDefault = (event: SyntheticEvent) => event.preventDefault();

interface Props {
  isWin: boolean;
  winCb: () => void;
  loseCb: () => void;
}

export default function NavigateLinks({ isWin, winCb, loseCb }: Props) {
  return (
    <Box
      className={classes.navigateLinksWrapper}
      sx={{
        typography: 'body1',
        '& > :not(style) + :not(style)': {
          ml: 4,
        },
      }}
      onClick={preventDefault}>
      {isWin ? (
        <Button className={classes.nextLevelButton} onClick={winCb}>
          Next level
        </Button>
      ) : (
        <>
          <Button onClick={loseCb}>Restart game</Button>
          <Button component={RouterLink} to="/leaderboard">Leaderboard</Button>
        </>
      )}
    </Box>
  );
}
