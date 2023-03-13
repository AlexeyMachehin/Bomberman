import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const select = (state: RootState) => state;

export const selectorUser = createSelector(
  [select],
  store => store.userReducer.user
);

export const selectorUserError = createSelector(
  [select],
  store => store.userReducer.error
);

export const selectorIsLoaderOn = createSelector(
  [select],
  store => store.userReducer.isLoaderOn
);
