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
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { localStorageAudioPlayerUtil } from './localStorageAudioPlayerUtil';

export default function AudioPlayer() {
  const dispatch = useAppDispatch();
  const isOnPlayer = useAppSelector(selectorIsOnMusic);
  const trackSRC = useAppSelector(selectorAudioTrackSRC);
  const isOnLoop = useAppSelector(selectorIsOnLoop);
  const playerRef = useRef(null);

  const location = useLocation();

  useEffect(() => {
    if (!localStorageAudioPlayerUtil.getVolumeLevel()) {
      localStorageAudioPlayerUtil.setVolumeLevel(1);
      dispatch(setVolumeLevel(1));
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(setIsOnLoop(false));
      dispatch(setAudioTrackSRC('@/../static/Main.mp3'));
    }
    if (location.pathname === '/leaderboard') {
      dispatch(setIsOnLoop(true));
      dispatch(setAudioTrackSRC('@/../static/LevelTheme.mp3'));
    }
    if (location.pathname === '/forum') {
      dispatch(setIsOnLoop(true));
      dispatch(setAudioTrackSRC('@/../static/LevelTheme.mp3'));
    }
    if (location.pathname === '/game') {
      dispatch(setIsOnLoop(true));
      dispatch(setAudioTrackSRC('@/../static/LevelTheme.mp3'));
    }
    setTimeout(() => {
      playerOn();
    }, 0);
  }, [location]);

  const togglePlay = () => {
    const player = document.getElementById('audioPlayer');
    const isOnPlayerLOcalStorage = localStorageAudioPlayerUtil.getIsOnPlayer();

    if (isOnPlayerLOcalStorage && isOnPlayer) {
      localStorageAudioPlayerUtil.setIsOffPlayer();
      dispatch(setIsOnMusic(false));
      (player as HTMLAudioElement).pause();
    } else {
      localStorageAudioPlayerUtil.setIsOnPlayer();
      dispatch(setIsOnMusic(true));
      (player as HTMLAudioElement).play();
    }
  };

  const playerOn = () => {
    const isOnPlayerLOcalStorage = localStorageAudioPlayerUtil.getIsOnPlayer();
    const player = document.getElementById('audioPlayer');

    if (isOnPlayerLOcalStorage) {
      (player as HTMLAudioElement).play();
    }
  };

  const playerOff = () => {
    const player = document.getElementById('audioPlayer');

    localStorageAudioPlayerUtil.setIsOffPlayer();
    dispatch(setIsOnMusic(false));
    (player as HTMLAudioElement).pause();
  };

  return (
    <>
      <audio loop={isOnLoop} ref={playerRef} id="audioPlayer" src={trackSRC} />
      <div id="audioPlayerToggleButtonId" onClick={togglePlay}></div>
      <div id="audioPlayerOnButtonId" onClick={playerOn}></div>
      <div id="audioPlayerOffButtonId" onClick={playerOff}></div>
    </>
  );
}
