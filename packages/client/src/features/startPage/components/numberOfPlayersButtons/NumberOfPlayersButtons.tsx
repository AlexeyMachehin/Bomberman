import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Route as RoutePath } from '@/const';
import classes from './numberOfPlayersButtons.module.css';

const images = [
  {
    url: '@/../static/img/oneBomber.jpg',
    title: 'ONE PLAYER',
    width: '50%',
  },
  {
    url: '@/../static/img/twoBombers.jpg',
    title: 'TWO PLAYERS',
    width: '50%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 300,

  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      fontSize: '1.8rem',
      border: '4px solid currentColor',
    },
  },
}));

export default function NumberOfPlayersButtons() {
  const navigate = useNavigate();

  return (
    <Box className={classes.container}>
      {images.map(image => (
        <ImageButton
          onClick={() => {
            navigate(RoutePath.GAME);
          }}
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}>
          <span
            className={classes.imageSrc}
            style={{ backgroundImage: `url(${image.url})` }}
          />
          <span className={`MuiImageBackdrop-root ${classes.imageBackdrop}`} />
          <span className={classes.image}>
            <Typography
              component="span"
              color="inherit"
              className={classes.buttonTitle}
              sx={{
                fontSize: '20px',
                pb: theme => `calc(${theme.spacing(1)} + 6px)`,
              }}>
              {image.title}
              <span
                className={`MuiImageBackdrop-root ${classes.imageMarked}`}
              />
            </Typography>
          </span>
        </ImageButton>
      ))}
    </Box>
  );
}
