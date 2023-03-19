import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import classes from './goBackButton.module.css';

export function GoBackButton() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Button
      className={classes.goBackButton}
      onClick={handleGoBack}
      variant="outlined"
      startIcon={<ArrowBackIosIcon />}>
      Go back
    </Button>
  );
}
