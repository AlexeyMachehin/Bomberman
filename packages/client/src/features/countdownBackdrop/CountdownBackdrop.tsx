import { useState, useRef, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import classes from './countdownBackdrop.module.css';

//Компонент с обратным отсчетом перед стартом игры. Он будет использован на странице с игрой.

export default function CountdownBackdrop() {
  const [isBackdropOpen, setOpen] = useState(false);
  const [timer, setTimer] = useState(3);
  const idRef = useRef<null | number>(null);
  const clear = () => {
    window.clearInterval(idRef.current ?? 0);
  };
  useEffect(() => {
    setOpen(!isBackdropOpen);
    if (idRef != null) {
      idRef.current = window.setInterval(() => {
        setTimer(time => time - 1);
      }, 1000);
    }
    return () => clear();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      clear();
      setOpen(false);
    }
  }, [timer]);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
      open={isBackdropOpen}>
      <div className={classes.backdropTimer}>
        <div className={classes.backdropStage}>Stage 1</div>
        {timer}
      </div>
    </Backdrop>
  );
}
