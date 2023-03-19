import * as React from 'react';
import { useAppDispatch } from '@/utils/hooks';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import HowToPlayModal from '../howToPlayModal/HowToPlayModal';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { AudioPlayerButton } from '@/features/audioPlayer/AudioPlayerButton';
import { setAudioTrackSRC } from '@/store/audioPlayer/audioPlayerSlice';
import AboutGameModal from '../aboutGameModal/AboutGameModal';
import { logout } from '@/store/user/thunk';
import { Route as RoutePath } from '@/const';
import classes from './navigateLinks.module.css';

const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

export default function NavigateLinks() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout()).then(() => {
      document.getElementById('audioPlayerOffButtonId')?.click();
      dispatch(setAudioTrackSRC('@/../static/Main.mp3'));
      navigate(RoutePath.LOGIN);
    });
  };

  return (
    <Box
      className={classes.navigateLinksWrapper}
      sx={{
        typography: 'body1',
        '& > :not(style) + :not(style)': {
          ml: 4,
        },
        '& > :not(style)': {
          fontSize: '20px',
        },
      }}
      onClick={preventDefault}>
      <Tooltip title="Logout from system">
        <Button
          href="#text-buttons"
          onClick={() => {
            handleLogout();
          }}>
          Logout
        </Button>
      </Tooltip>
      <Tooltip title="Go to Profile/Change profile data">
        <Button
          onClick={() => {
            navigate(RoutePath.PROFILE);
          }}>
          Profile
        </Button>
      </Tooltip>
      <Tooltip title="Go to Forum">
        <Button
          onClick={() => {
            navigate(RoutePath.FORUM);
          }}>
          Forum
        </Button>
      </Tooltip>
      <Tooltip title="Go to Leaderboard">
        <Button
          onClick={() => {
            navigate(RoutePath.LEADERBOARD);
          }}>
          Leaderboard
        </Button>
      </Tooltip>
      <HowToPlayModal />
      <AboutGameModal />
      <AudioPlayerButton />
    </Box>
  );
}
