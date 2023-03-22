import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { GoBackButton } from '@/features/goBackButton/GoBackButton';

test('GoBackButton component renders correctly', () => {
  const component = render(
    <Provider store={store}>
      <GoBackButton />
    </Provider>
  );
  expect(component).toMatchSnapshot();
});
