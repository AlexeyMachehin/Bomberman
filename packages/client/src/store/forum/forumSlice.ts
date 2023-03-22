import { createSlice } from '@reduxjs/toolkit';
import { forumState } from './forumState';
import { findQuestions, getTopics, loadSection, sendQuestion } from './thunk';

export const forumSlice = createSlice({
  name: 'forum',
  initialState: forumState,
  reducers: {
    clearFoundedQuestions: state => {
      state.foundedQuestions = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(findQuestions.fulfilled, (state, action) => {
      state.foundedQuestions = action.payload;
    });
    builder.addCase(loadSection.fulfilled, (state, action) => {
      state.currentSection = action.payload;
    });
    builder.addCase(getTopics.fulfilled, (state, action) => {
      state.topics = action.payload;
    });
  },
});

export const { clearFoundedQuestions } = forumSlice.actions;
