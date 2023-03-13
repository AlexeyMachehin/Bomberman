import { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import NavigateLinks from './components/navigateLinks/NavigateLinks';
import UserCard from './components/userCard/UserCard';
import Confetti from 'react-confetti';
import { IPlayerProfile } from '../../service/types/game/IPlayerProfile';
import classes from './endGameBackdrop.module.css';

export default function EndGameBackdrop() {
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

  const isWin = true;
  const stage = 1;

  const users: IPlayerProfile[] = [
    {
      name: 'Danil',
      score: 12345,
      timeToDead: 4,
      kills: 5,
      damage: 435,
      avatarURL:
        'https://pixelbox.ru/wp-content/uploads/2021/05/ava-vk-animal-91.jpg',
      id: 1,
    },
    {
      name: 'Anton',
      score: 54321,
      timeToDead: 3,
      kills: 7,
      damage: 445335,
      avatarURL: 'https://avatarko.ru/img/kartinka/1/pozitiv_smailik.jpg',
      id: 2,
    },
  ];

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
          <div className={classes.stageTitle}>Stage {stage}</div>
          <div className={classes.cardsWrapper}>
            {users.map((user: IPlayerProfile) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
          <NavigateLinks isWin={isWin} />
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
