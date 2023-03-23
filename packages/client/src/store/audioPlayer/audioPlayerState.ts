import mainTrack from '../../../static/Main.mp3';

export const audioPlayerState: {
  isOnMusic: boolean;
  trackSRC: string;
  volumeLevel: number;
  loop: boolean;
} = {
  isOnMusic: false,
  trackSRC: mainTrack,
  volumeLevel: 1,
  loop: false,
};
