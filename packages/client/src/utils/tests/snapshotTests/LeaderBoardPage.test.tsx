import LiderBoardPage from '@/pages/leaderBoardPage/LeaderBoardPage';
import { render } from '@testing-library/react';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

test('LeaderBoardPage renders correctly', () => {
  const component = render(
    <MemoryRouter>
      <Provider store={store}>
        <LiderBoardPage />
      </Provider>
    </MemoryRouter>
  );
  expect(component).toMatchSnapshot();
});
