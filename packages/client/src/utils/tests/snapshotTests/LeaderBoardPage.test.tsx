import LiderBoardPage from '@/pages/leaderBoardPage/LeaderBoardPage';
import { render } from '@testing-library/react';
import { store } from '@/store/store';
import { Provider } from 'react-redux';

test('LeaderBoardPage renders correctly', () => {
  const component = render(
    <Provider store={store}>
      <LiderBoardPage />
    </Provider>
  );
  expect(component).toMatchSnapshot();
});
