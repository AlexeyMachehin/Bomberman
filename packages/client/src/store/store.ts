import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/userSlice';
import { forumSlice } from './forum/forumSlice';

export const createStore = () => {
  return configureStore({
    reducer: {
      userReducer: userSlice.reducer,
      forumReducer: forumSlice.reducer,
    },
  });
};

export const store = createStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
