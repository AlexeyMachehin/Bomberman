import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { StartPageButton } from '@/features/startPageButton/StartPageButton';

test('StartPageButton component renders correctly', () => {
  const component = render(
    <Provider store={store}>
      <StartPageButton />
    </Provider>
  );
  expect(component).toMatchSnapshot();
});
