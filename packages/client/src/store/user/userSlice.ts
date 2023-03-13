import { getUser, login, logout, signup } from './thunk';
import { createSlice } from '@reduxjs/toolkit';
import { userState } from './userState';

export const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUser.pending, state => {
      state.isLoaderOn = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoaderOn = false;
    });
    builder.addCase(getUser.rejected, state => {
      state.isLoaderOn = false;
    });
    builder.addCase(logout.pending, state => {
      state.error = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.error.message ?? null;
    });
    builder.addCase(logout.fulfilled, state => {
      state.user = null;
    });
    builder.addCase(login.pending, state => {
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error.message ?? null;
    });
    builder.addCase(login.fulfilled, state => {
      state.error = null;
    });
    builder.addCase(signup.pending, state => {
      state.error = null;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.error = action.error.message ?? null;
    });
    builder.addCase(signup.fulfilled, state => {
      state.error = null;
    });
  },
});
