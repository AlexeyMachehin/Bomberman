import { configureStore } from '@reduxjs/toolkit';
import { audioPlayerSlice } from './audioPlayer/audioPlayerSlice';
import { errorSnackbarSlice } from './errorSnackbar/errorSnackbarSlice';
import { userSlice } from './user/userSlice';

export const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer,
    errorSnackbarReducer: errorSnackbarSlice.reducer,
    audioPlayerReducer: audioPlayerSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
