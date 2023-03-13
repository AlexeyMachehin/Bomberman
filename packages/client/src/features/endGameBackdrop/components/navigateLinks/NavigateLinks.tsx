import { SyntheticEvent } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import classes from './navigateLinks.module.css';

const preventDefault = (event: SyntheticEvent) => event.preventDefault();

export default function NavigateLinks(props: { isWin: boolean }) {
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
      <Button href="#text-buttons">Restart game</Button>
      <Button href="#text-buttons">Restart level</Button>
      <Button href="#text-buttons">Leaderboard</Button>
      {props.isWin && (
        <Button className={classes.nextLevelButton} href="#text-buttons">
          Next level
        </Button>
      )}
    </Box>
  );
}
