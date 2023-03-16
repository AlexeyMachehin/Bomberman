import LeaderBoardPage from '@/pages/leaderBoardPage/LeaderBoardPage';
import { render } from '@testing-library/react';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { Route as RoutePath } from '@/const';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

test('LeaderBoardPage renders correctly', () => {
  const component = render(
    <MemoryRouter>
      <Provider store={store}>
        <Routes>
          <Route path={RoutePath.LEADERBOARD} element={<LeaderBoardPage />} />
        </Routes>
      </Provider>
    </MemoryRouter>
  );
  expect(component).toMatchSnapshot();
});
