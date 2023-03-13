import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import React from 'react';
import { Provider } from 'react-redux';
import App from './src/App';
import { createStore } from './src/store/store';
import { IUserState } from './src/store/user/userState';
import { EnhancedStore } from '@reduxjs/toolkit';

interface IRenderProps {
  store: EnhancedStore<{
    userReducer: IUserState;
  }>;
  path: string;
}

export const createStoreForSSR = createStore;

export const render = ({ store, path }: IRenderProps) => {
  return renderToString(
    <StaticRouter location={path}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  );
};
