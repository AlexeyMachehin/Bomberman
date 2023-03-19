import '../../matchMedia.mock';
import ForumPage from '@/pages/forumPage/ForumPage';
import Login from '@/pages/Login/Login';
import Signup from '@/pages/Signup/Signup';
import StartPage from '@/pages/startPage/StartPage';
import LeaderBoard from '../../pages/leaderBoardPage/LeaderBoardPage';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { Route as RoutePath } from '@/const';
import App from '@/App';
import '@testing-library/jest-dom';

describe('Routes rendering', () => {
  test('Renders Login component when on /login route', () => {
    render(
      <MemoryRouter initialEntries={[RoutePath.LOGIN]}>
        <Provider store={store}>
          <Routes>
            <Route path={RoutePath.LOGIN} element={<Login />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('Login-component')).toBeInTheDocument();
  });

  test('Renders Signup component when on /signup route', () => {
    render(
      <MemoryRouter initialEntries={[RoutePath.SIGNUP]}>
        <Provider store={store}>
          <Routes>
            <Route path={RoutePath.SIGNUP} element={<Signup />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('Signup-component')).toBeInTheDocument();
  });

  test('Renders StartPage component when on / route', () => {
    render(
      <MemoryRouter initialEntries={[RoutePath.INDEX]}>
        <Provider store={store}>
          <Routes>
            <Route path={RoutePath.INDEX} element={<StartPage />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('startPage-component')).toBeInTheDocument();
  });

  test('Renders ForumPage component when on /forum route', () => {
    render(
      <MemoryRouter initialEntries={[RoutePath.FORUM]}>
        <Provider store={store}>
          <Routes>
            <Route path={RoutePath.FORUM} element={<ForumPage />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('forum-component')).toBeInTheDocument();
  });

  test('Renders LeaderBoard component when on /leaderboard route', () => {
    render(
      <MemoryRouter initialEntries={[RoutePath.LEADERBOARD]}>
        <Provider store={store}>
          <Routes>
            <Route path={RoutePath.LEADERBOARD} element={<LeaderBoard />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('leaderBoardPage-component')).toBeInTheDocument();
  });

  test('Check UnAuthGuard', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByTestId('Login-component')).toBeInTheDocument();
  });
});
