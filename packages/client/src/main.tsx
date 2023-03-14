import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store/store';
import { register } from '../serviceWorkerBase';
import './index.css';
import '@/../static/Main.mp3';
import '@/../static/LevelTheme.mp3';

// Регистрация Service Worker.
register();

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
