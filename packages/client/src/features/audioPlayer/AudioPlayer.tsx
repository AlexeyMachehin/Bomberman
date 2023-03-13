import { setIsOnMusic } from '@/store/audioPlayer/audioPlayerSlice';
import {
  selectorAudioTrackSRC,
  selectorIsOnMusic,
} from '@/store/audioPlayer/selectors';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { useRef } from 'react';
import { localStoragePlayerUtil } from './localStoragePlayerUtil';

export default function AudioPlayer() {
  const dispatch = useAppDispatch();
  const isOnPlayer = useAppSelector(selectorIsOnMusic);
  const trackSRC = useAppSelector(selectorAudioTrackSRC);
  const playerRef = useRef(null);

  const togglePlay = () => {
    const player = document.getElementById('audioPlayer');
    const isOnPlayerLOcalStorage = localStoragePlayerUtil.getIsOnPlayer();

    if (isOnPlayerLOcalStorage && isOnPlayer) {
      localStoragePlayerUtil.setIsOffPlayer();
      dispatch(setIsOnMusic(false));
      (player as HTMLAudioElement).pause();
    } else {
      localStoragePlayerUtil.setIsOnPlayer();
      (player as HTMLAudioElement).play();
      dispatch(setIsOnMusic(true));
    }
  };

  return (
    <>
      <audio ref={playerRef} id="audioPlayer" src={trackSRC} />
      <div
        id="audioPlayerToggleButtonId"
        style={{ width: '100%', height: '100%', opacity: '0.5' }}
        onClick={togglePlay}></div>
    </>
  );
}
