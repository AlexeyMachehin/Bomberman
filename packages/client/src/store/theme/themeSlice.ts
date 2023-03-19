import { createSlice } from '@reduxjs/toolkit';
import { themeState } from './themeState';
import { getUserTheme } from './thunk';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: themeState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserTheme.fulfilled, (state, action) => {
      if (action.payload.theme) state.theme = action.payload.theme;
    });
  },
});

export const { setTheme } = themeSlice.actions;
