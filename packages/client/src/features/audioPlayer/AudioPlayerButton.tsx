import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import {
  selectorIsOnMusic,
  selectorVolumeLevel,
} from '@/store/audioPlayer/selectors';
import Button from '@mui/material/Button';
import { setVolumeLevel } from '@/store/audioPlayer/audioPlayerSlice';
import classes from './audioPlayerButton.module.css';

export const AudioPlayerButton = () => {
  const dispatch = useAppDispatch();
  const isOnPlayer = useAppSelector(selectorIsOnMusic);
  const volumeLevel = useAppSelector(selectorVolumeLevel);

  const handleVolumeChange = (event: any) => {
    const player = document.getElementById('audioPlayer');
    const value = parseFloat(event.target.value);
    (player as HTMLAudioElement).volume = value;
    dispatch(setVolumeLevel(value));
  };

  return (
    <div>
      <div className={classes.audioPlayerToolsWrapper}>
        <Button
          style={{ width: '120px', marginBottom: '10px' }}
          variant="contained"
          onClick={() =>
            document.getElementById('audioPlayerToggleButtonId')?.click()
          }>
          {isOnPlayer ? 'mute' : 'audio on'}
        </Button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volumeLevel}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};
