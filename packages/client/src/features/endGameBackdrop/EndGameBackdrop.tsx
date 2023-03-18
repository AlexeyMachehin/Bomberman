import { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Confetti from 'react-confetti';
import UserCard from './components/userCard/UserCard';
import NavigateLinks from './components/navigateLinks/NavigateLinks';
import { IPlayer } from '@/service/types/liderBoard/IPlayer';
import classes from './endGameBackdrop.module.css';

interface Props {
  user: IPlayer;
  level: number;
  isWin: boolean;
  winCb: () => void;
  loseCb: () => void;
}

export default function EndGameBackdrop({user, level, isWin, winCb, loseCb}: Props) {
  const [width, setWidth] = useState(document.documentElement.clientWidth);
  const [height, setHeight] = useState(document.documentElement.clientHeight);

  function onResize() {
    setWidth(document.documentElement.clientWidth);
    setHeight(document.documentElement.clientHeight);
  }

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div>
      <Backdrop
        className={classes.backdrop}
        sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
        open={true}>
        <div className={classes.backdropContainer}>
          {isWin ? (
            <h2 className={`${classes.endGameTitle} ${classes.winColor}`}>
              Win !
            </h2>
          ) : (
            <h2 className={`${classes.endGameTitle} ${classes.gameOverColor}`}>
              Game over
            </h2>
          )}
          <div className={classes.stageTitle}>Stage {level}</div>
          <div className={classes.cardsWrapper}>
            <UserCard key={user.id} user={user} />
          </div>
          <NavigateLinks isWin={isWin} winCb={winCb} loseCb={loseCb}/>
        </div>
      </Backdrop>
      {isWin && (
        <Confetti
          width={width}
          height={height}
          gravity={0.02}
          style={{
            zIndex: '9999',
          }}
        />
      )}
    </div>
  );
}
