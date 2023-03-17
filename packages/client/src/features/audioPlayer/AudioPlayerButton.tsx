import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { useEffect } from 'react';
import {
  selectorIsOnMusic,
  selectorVolumeLevel,
} from '@/store/audioPlayer/selectors';
import Button from '@mui/material/Button';
import {
  setIsOnMusic,
  setVolumeLevel,
} from '@/store/audioPlayer/audioPlayerSlice';
import { localStorageAudioPlayerUtils } from './localStorageAudioPlayerUtils';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import classes from './audioPlayerButton.module.css';

export const AudioPlayerButton = () => {
  const dispatch = useAppDispatch();
  const isOnPlayer = useAppSelector(selectorIsOnMusic);
  const volumeLevelState = useAppSelector(selectorVolumeLevel);

  const handleVolumeChange = (event: { target: { value: string } }) => {
    const player = document.getElementById('audioPlayer');
    const value = parseFloat(event.target.value);
    (player as HTMLAudioElement).volume = value;
    dispatch(setVolumeLevel(value));
    localStorageAudioPlayerUtils.setVolumeLevel(value);
  };

  useEffect(() => {
    const volumeLevel = localStorageAudioPlayerUtils.getVolumeLevel();
    const isOnPlayer = localStorageAudioPlayerUtils.getIsOnPlayer();

    if (volumeLevel) {
      dispatch(setVolumeLevel(volumeLevel));
    }

    if (isOnPlayer) {
      dispatch(setIsOnMusic(true));
    }
  }, []);

  return (
    <div>
      <div className={classes.audioPlayerToolsWrapper}>
        <Button
          style={{ width: '120px', marginBottom: '10px' }}
          variant="contained"
          onClick={() =>
            document.getElementById('audioPlayerToggleButtonId')?.click()
          }>
          {isOnPlayer ? <VolumeMuteIcon /> : <VolumeOffIcon />}
        </Button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volumeLevelState}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};
