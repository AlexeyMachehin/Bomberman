import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import HowToPlayModal from '../howToPlayModal/HowToPlayModal';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import classes from './navigateLinks.module.css';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { logout } from '@/store/user/thunk';
import { useAppDispatch } from '@/utils/hooks';

const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

export default function NavigateLinks() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutError, setLogoutError] = useState<null | string>(null);

  const handleLogout = async () => {
    try {
      dispatch(logout())
        .then(() => navigate('/login'));
      setLogoutError(null);
    } catch (e) {
      if (typeof e === 'string') {
        setLogoutError(e);
      }
    }
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
        <Button href="#text-buttons" onClick={handleLogout}>
          Logout
        </Button>
      </Tooltip>
      <Tooltip title="Go to Forum">
        <Button onClick={() => navigate('/forum')}>Forum</Button>
      </Tooltip>
      <Tooltip title="Go to Leaderboard">
        <Button onClick={() => navigate('/leaderboard')}>Leaderboard</Button>
      </Tooltip>
      <HowToPlayModal />
      {logoutError && (
        <Alert className={classes.errorWrapper} severity="error">
          {logoutError}
        </Alert>
      )}
    </Box>
  );
}
