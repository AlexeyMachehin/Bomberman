import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import { Route as RoutePath } from '@/const';
import classes from './startPageButton.module.css';

export function StartPageButton() {
  const navigate = useNavigate();
  return (
    <Button
      className={classes.startPageButton}
      onClick={() => navigate(RoutePath.INDEX)}
      variant="outlined"
      startIcon={<FirstPageIcon />}>
      start page
    </Button>
  );
}
