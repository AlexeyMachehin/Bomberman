import { createSlice } from '@reduxjs/toolkit';
import { audioPlayerState } from './audioPlayerState';

export const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState: audioPlayerState,
  reducers: {
    setIsOnMusic(state, action) {
      state.isOnMusic = action.payload;
    },
    setAudioTrackSRC(state, action) {
      state.trackSRC = action.payload;
    },
    setVolumeLevel(state, action) {
      state.volumeLevel = action.payload;
    },
  },
});

export const { setIsOnMusic, setAudioTrackSRC, setVolumeLevel } =
  audioPlayerSlice.actions;
