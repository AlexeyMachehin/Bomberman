import { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

const select = (state: RootState) => state;

export const selectorIsOnMusic = createSelector(
  [select],
  store => store.audioPlayerReducer.isOnMusic
);

export const selectorVolumeLevel = createSelector(
  [select],
  store => store.audioPlayerReducer.volumeLevel
);

export const selectorAudioTrackSRC = createSelector(
  [select],
  store => store.audioPlayerReducer.trackSRC
);
