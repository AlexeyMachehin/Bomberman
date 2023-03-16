import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { selectorUser } from '@/store/user/selectors';
import {
  setAudioTrackSRC,
  setIsOnLoop,
  setIsOnMusic,
  setVolumeLevel,
} from '@/store/audioPlayer/audioPlayerSlice';
import {
  selectorAudioTrackSRC,
  selectorIsOnLoop,
  selectorIsOnMusic,
} from '@/store/audioPlayer/selectors';
import { localStorageAudioPlayerUtils } from './localStorageAudioPlayerUtils';
import { Route as RoutePath } from '@/const';

export default function AudioPlayer() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorUser);
  const isOnPlayer = useAppSelector(selectorIsOnMusic);
  const trackSRC = useAppSelector(selectorAudioTrackSRC);
  const isOnLoop = useAppSelector(selectorIsOnLoop);
  const playerRef = useRef(null);
  const defaultVolume = 1;

  const location = useLocation();

  useEffect(() => {
    const currentVolumeLevel = localStorageAudioPlayerUtils.getVolumeLevel();
    if (!currentVolumeLevel) {
      localStorageAudioPlayerUtils.setVolumeLevel(1);
      dispatch(setVolumeLevel(defaultVolume));
    } else {
      dispatch(setVolumeLevel(currentVolumeLevel));
      const player = document.getElementById('audioPlayer');
      (player as HTMLAudioElement).volume = currentVolumeLevel;
    }
  }, []);

  useEffect(() => {
    if (location.pathname === RoutePath.INDEX) {
      dispatch(setIsOnLoop(false));
      dispatch(setAudioTrackSRC('@/../static/Main.mp3'));
    }
    if (location.pathname === RoutePath.LEADERBOARD) {
      dispatch(setIsOnLoop(true));
      dispatch(setAudioTrackSRC('@/../static/LevelTheme.mp3'));
    }
    if (location.pathname === RoutePath.FORUM) {
      dispatch(setIsOnLoop(true));
      dispatch(setAudioTrackSRC('@/../static/LevelTheme.mp3'));
    }
    if (location.pathname === RoutePath.GAME) {
      dispatch(setIsOnLoop(true));
      dispatch(setAudioTrackSRC('@/../static/LevelTheme.mp3'));
    }
    if (location.pathname === RoutePath.PROFILE) {
      dispatch(setIsOnLoop(true));
      dispatch(setAudioTrackSRC('@/../static/LevelTheme.mp3'));
    }
    setTimeout(() => {
      if (user) {
        playerOn();
      }
    }, 0);
  }, [location]);

  const togglePlay = () => {
    const player = document.getElementById('audioPlayer');
    const isOnPlayerLOcalStorage = localStorageAudioPlayerUtils.getIsOnPlayer();

    if (isOnPlayerLOcalStorage && isOnPlayer) {
      localStorageAudioPlayerUtils.setIsOffPlayer();
      dispatch(setIsOnMusic(false));
      (player as HTMLAudioElement).pause();
    } else {
      localStorageAudioPlayerUtils.setIsOnPlayer();
      dispatch(setIsOnMusic(true));
      (player as HTMLAudioElement).play();
    }
  };

  const playerOn = () => {
    const isOnPlayerLOcalStorage = localStorageAudioPlayerUtils.getIsOnPlayer();
    const player = document.getElementById('audioPlayer');

    if (isOnPlayerLOcalStorage) {
      (player as HTMLAudioElement).play();
    }
  };

  const playerOff = () => {
    const player = document.getElementById('audioPlayer');

    localStorageAudioPlayerUtils.setIsOffPlayer();
    dispatch(setIsOnMusic(false));
    (player as HTMLAudioElement).pause();
  };

  return (
    <>
      <audio loop={isOnLoop} ref={playerRef} id="audioPlayer" src={trackSRC} />
      <div id="audioPlayerToggleButtonId" onClick={togglePlay}></div>
      <div id="audioPlayerOffButtonId" onClick={playerOff}></div>
    </>
  );
}
